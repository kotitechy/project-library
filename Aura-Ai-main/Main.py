
import os
import json
import time
import threading
import re
from datetime import datetime, timedelta
from pathlib import Path
import pyttsx3
import speech_recognition as sr
from ics import Calendar, Event
import dateparser
import urllib.parse
#Genai
GENAI_ENABLED = False
try:
    import google.generativeai as genai
    api_key = "AIzaSyAC9FKrqPTbuuAroSAjvVeUuxLG0vShmk0" 
    if api_key:
        genai.configure(api_key=api_key)
        GENAI_ENABLED = True
except Exception:
    GENAI_ENABLED = False

## ---------------- TTS ----------------
import queue
import threading
import pyttsx3

engine = pyttsx3.init()
engine.setProperty("rate", 155)

_tts_queue = queue.Queue()
_stop_event = threading.Event()

def _tts_worker():
    while True:
        text = _tts_queue.get()
        if text is None:  # shutdown signal
            break
        def on_word(name, location, length):
            if _stop_event.is_set():
                engine.stop()
        engine.connect("started-word", on_word)
        try:
            engine.say(text)
            engine.runAndWait()
        except Exception as e:
            print("TTS failed:", e)
        _tts_queue.task_done()

# start background thread
threading.Thread(target=_tts_worker, daemon=True).start()
engine = pyttsx3.init()

def speak(text: str):
    def run_tts():
        try:
            engine.say(text)
            engine.runAndWait()
        except Exception as e:
            print(f"TTS error: {e}")
    
    # Run TTS in a separate thread so it won’t block or conflict
    t = threading.Thread(target=run_tts)
    t.start()

def stop_speaking():
    """Stop current speech immediately."""
    _stop_event.set()
    try:
        engine.stop()
    except:
        pass

# ---------------- Speech listening helpers ----------------
recognizer = sr.Recognizer()

def listen_once(timeout=6, phrase_time_limit=20):
    """Try to get one voice input; returns string or None."""
    stop_speaking()   # 🔥 stop talking before listening
    try:
        with sr.Microphone() as mic:
            recognizer.adjust_for_ambient_noise(mic, duration=0.6)
            print("Listening...")
            audio = recognizer.listen(mic, timeout=timeout, phrase_time_limit=phrase_time_limit)
            text = recognizer.recognize_google(audio)
            print("You:", text)
            return text
    except sr.WaitTimeoutError:
        print("listen_once: timeout waiting for phrase")
        return None
    except Exception as e:
        print("listen_once error:", e)
        return None

def listen_with_fallback(prompt=None, retries=2):
    """Prompt by voice, then try listening; if not heard, fall back to typed input."""
    if prompt:
        speak(prompt)
    for _ in range(retries):
        txt = listen_once()
        if txt:
            return txt
        speak("I couldn't hear that. Please repeat.")
    # final fallback to typing
    speak("Please type your response.")
    try:
        return input("You (type): ")
    except Exception:
        return None

def listen_yes_no(prompt=None):
    """Ask yes/no question, return True/False or None."""
    if prompt:
        speak(prompt)
    for _ in range(3):
        ans = listen_once()
        if not ans:
            speak("Please say yes or no.")
            continue
        a = ans.lower()
        if any(w in a for w in ("yes","yeah","yep","correct","right","sure","affirm")):
            return True
        if any(w in a for w in ("no","nope","nah","incorrect","not")):
            return False
        speak("I didn't catch yes or no. Please say 'yes' or 'no'.")
    # fallback typed
    speak("Please type 'yes' or 'no'.")
    try:
        typed = input("Yes/no: ").strip().lower()
        return typed.startswith("y")
    except Exception:
        return None

# ---------------- LLM + parsing helpers ----------------
def call_llm_for_json(prompt_text, max_tokens=256):
    if not GENAI_ENABLED:
        return None
    try:
        if hasattr(genai, "generate_text"):
            resp = genai.generate_text(model="gemini-1.5-flash", input=prompt_text)
            return getattr(resp, "text", str(resp))
        if hasattr(genai, "GenerativeModel"):
            model = genai.GenerativeModel("gemini-1.5-flash")
            try:
                resp = model.generate_content(prompt_text)
                return getattr(resp, "text", str(resp))
            except Exception:
                from google.genai import types
                contents = [
                    types.Content(role="user", parts=[types.Part.from_text(text=prompt_text)])
                ]
                resp_stream = model.generate_content_stream(model="gemini-1.5-flash", contents=contents)
                out = ""
                for chunk in resp_stream:
                    out += getattr(chunk, "text", "") or ""
                return out
    except Exception as e:
        print("LLM call failed:", e)
        return None
    return None

def extract_json_from_text(text):
    if not text:
        return None
    m = re.search(r"\{.*?\}", text, re.S)
    if not m:
        return None
    try:
        return json.loads(m.group())
    except Exception:
        try:
            cleaned = m.group().replace("'", '"')
            return json.loads(cleaned)
        except Exception:
            return None

def llm_parse_datetime(raw_text):
    prompt = (
        "Extract date and time from this user phrase. Output only a JSON object with keys "
        "'date' (YYYY-MM-DD or null), 'time' (HH:MM 24-hour or null), 'datetime' (ISO 'YYYY-MM-DDTHH:MM' or null). "
        "If year is missing, pick the next occurrence in the future. If you can't extract, put null. "
        f"User phrase: \"{raw_text}\""
    )
    resp_text = call_llm_for_json(prompt)
    if resp_text:
        j = extract_json_from_text(resp_text)
        if j:
            dt_str = j.get("datetime") or None
            if dt_str:
                dt = dateparser.parse(dt_str, settings={"PREFER_DATES_FROM":"future"})
                if dt:
                    return dt
            date_part = j.get("date") or ""
            time_part = j.get("time") or ""
            combined = (date_part + " " + time_part).strip()
            if combined:
                dt = dateparser.parse(combined, settings={"PREFER_DATES_FROM":"future"})
                if dt:
                    return dt
    return dateparser.parse(raw_text, settings={"PREFER_DATES_FROM":"future"})

def parse_duration_minutes(raw_text):
    if not raw_text:
        return None
    raw = raw_text.lower()
    hours = 0
    minutes = 0
    m = re.search(r'(\d+)\s*(?:hour|hr|hours)', raw)
    if m:
        hours = int(m.group(1))
    m2 = re.search(r'(\d+)\s*(?:minute|min|mins)', raw)
    if m2:
        minutes = int(m2.group(1))
    if hours == 0 and minutes == 0:
        m3 = re.search(r'(\d+)', raw)
        if m3:
            val = int(m3.group(1))
            if val <= 60:
                minutes = val
            else:
                hours = val
    total = hours * 60 + minutes
    return total if total > 0 else None

# ---------------- Meeting scheduling ----------------
BASE = Path.cwd()
MEETINGS_FILE = BASE / "meetings.json"
if not MEETINGS_FILE.exists():
    MEETINGS_FILE.write_text("[]")

def save_meeting_to_store(me):
    meetings = json.loads(MEETINGS_FILE.read_text() or "[]")
    meetings.append(me)
    MEETINGS_FILE.write_text(json.dumps(meetings, indent=2))

def create_ics_and_store(title, start_dt, end_dt, location="", description=""):
    cal = Calendar()
    ev = Event()
    ev.name = title
    ev.begin = start_dt
    ev.end = end_dt
    ev.location = location
    ev.description = description
    cal.events.add(ev)
    fname = f"meeting_{int(time.time())}.ics"
    with open(fname, "w", encoding="utf-8") as f:
        f.writelines(cal)
    entry = {
        "id": int(time.time()),
        "title": title,
        "start": start_dt.isoformat(),
        "end": end_dt.isoformat(),
        "location": location,
        "description": description,
        "ics": fname
    }
    save_meeting_to_store(entry)
    return entry

def schedule_meeting_flow():
    title = listen_with_fallback("What's the meeting title?")
    if not title:
        speak("No title provided. Cancelling.")
        return

    raw_dt = listen_with_fallback("When is the meeting? You can say '12th January at 6 pm' or 'next Monday at 10'.")
    if not raw_dt:
        speak("No date/time provided. Cancelling.")
        return

    parsed_dt = llm_parse_datetime(raw_dt)
    attempts = 0
    while (parsed_dt is None) and attempts < 2:
        attempts += 1
        raw_dt = listen_with_fallback("I couldn't understand the date/time. Please say full date and time like '17 March 2026 at 10:20 AM'.")
        if not raw_dt:
            speak("No date/time given. Cancelling.")
            return
        parsed_dt = llm_parse_datetime(raw_dt)

    if parsed_dt is None:
        speak("Sorry, I still couldn't parse a valid date and time. Cancelling scheduling.")
        return

    while True:
        human_readable = parsed_dt.strftime("%A, %d %B %Y at %I:%M %p")
        ok = listen_yes_no(f"I understood: {human_readable}. Is that correct?")
        if ok is True:
            break
        if ok is False:
            correction = listen_with_fallback("Please say the correct date and time in a phrase.")
            if not correction:
                speak("No correction provided. Cancelling.")
                return
            parsed_dt = llm_parse_datetime(correction)
            if parsed_dt is None:
                speak("I couldn't parse that either. Let's try again.")
                continue
        else:
            speak("No confirmation received. Cancelling.")
            return

    dur_input = listen_with_fallback("How long is the meeting? Say duration like '1 hour' or '45 minutes'. If you want default 60 minutes, say 'default'.")
    duration_minutes = None
    if dur_input:
        if "default" in dur_input.lower() or "one hour" in dur_input.lower():
            duration_minutes = 60
        else:
            duration_minutes = parse_duration_minutes(dur_input)
    if not duration_minutes:
        dur_input = listen_with_fallback("I didn't understand the duration. Please say '30 minutes' or '1 hour'.")
        duration_minutes = parse_duration_minutes(dur_input) if dur_input else 60
        if not duration_minutes:
            duration_minutes = 60

    end_dt = parsed_dt + timedelta(minutes=duration_minutes)

    loc = listen_with_fallback("Any location? Say 'none' or provide a place.")
    if loc and loc.lower().strip() in ("none","no","n"):
        loc = ""
    desc = listen_with_fallback("Any quick description or agenda? Say 'none' to skip.")
    if desc and desc.lower().strip() in ("none","no","n"):
        desc = ""

    entry = create_ics_and_store(title, parsed_dt, end_dt, location=loc or "", description=desc or "")
    speak(f"Scheduled '{title}' on {parsed_dt.strftime('%A, %d %B %Y at %I:%M %p')} for {duration_minutes} minutes. I saved an .ics file named {entry['ics']}.")

# ---------------- Main assistant loop ----------------
def main_loop():
    speak("Hello, this is Aura. I am listening for commands.")
    while True:
        cmd = listen_with_fallback("What can I do for you?")
        if not cmd:
            continue
        cmd_l = cmd.lower()
        if any(x in cmd_l for x in ("schedule meeting","schedule a meeting","create meeting","add meeting","set meeting")):
            schedule_meeting_flow()
            continue
        if any(x in cmd_l for x in ("exit","quit","stop","goodbye")):
            speak("Goodbye!")
            break
        speak("Let me think...")
        prompt = f"User: {cmd}\nReply conversationally and help if possible."
        llm_resp = call_llm_for_json(prompt)
        if llm_resp:
            speak(llm_resp.strip()[:800])
        else:
            speak("I can schedule meetings, open websites, and set alarms. Try saying 'schedule meeting' or 'set alarm'.")

if __name__ == "__main__":
    try:
        main_loop()
    except KeyboardInterrupt:
        speak("Stopped by user. Bye.")
