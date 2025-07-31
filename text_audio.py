
def generate_speech(text):
    from gtts import gTTS
    import os
    text.strip()
    if not text:
        print("No input provided.")
        return

    tts = gTTS(text=text, lang='en')  # You can change 'en' to 'hi' for Hindi, etc.
    filename = "generated_speech.mp3"
    tts.save(filename)
    print(f"Speech saved to: {filename}")
    try:
        print('Opening File...')
        os.system(f"start {filename}")  
    except:
        print('Something went wrong please try again...')
        pass
    return 'Audio file saved...'

