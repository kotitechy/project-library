# Aura AI – Meeting Scheduler Module

## Overview

**Aura AI** is an intelligent personal assistant designed to help users manage their daily tasks efficiently. The **Meeting Scheduler** module enables users to effortlessly schedule, view, and manage meetings, ensuring better time management and productivity.

This module leverages AI to understand your preferences, check availability, and automate scheduling.

---

## Features

* **Smart Scheduling:** Suggests meeting times based on user availability.
* **Conflict Detection:** Alerts if meeting times overlap with existing events.
* **Calendar Integration:** Can sync with Google Calendar, Outlook, or other calendar services.
* **Natural Language Input:** Users can schedule meetings using simple language, e.g., “Schedule a team call tomorrow at 3 PM.”
* **Recurring Meetings:** Support for daily, weekly, or custom recurring events.

---

## Technology Stack

* **Programming Language:** Python
* **AI:** Perplexity(for understanding natural language scheduling requests)
* **Integration:** Google Calendar API / Outlook API
* **ui:** Console

---

## Project Structure

```
AuraAI/
│
├── main.py        # Core scheduling logic
|__ convo.log   # Logging
|__ meeting.ics   $ Example output
├── requirements.txt    # Project dependencies
└── README.md
```

---

## Usage

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Calendar Integration

* Obtain API credentials from Google/Outlook.
* Add credentials to `calendar_integration.py`.

### 3. Run the Scheduler

```bash
python main.py
```

### 4. Schedule a Meeting

* Use natural language input:

```
"Schedule a meeting with John tomorrow at 10 AM for 30 minutes."
```

* The AI parses the request, checks availability, and confirms the meeting.

### 5. View Scheduled Meetings

* Optionally, launch the Streamlit or web UI:

```bash
python run main.py
```

---

## Example

**Input:**

```
Schedule a Team meeting at conference room A to  Discuss project progress and next steps.
```

**Output:**

```
BEGIN:VCALENDAR

VERSION:2.0

PRODID:ics.py - http://git.io/lLljaA

BEGIN:VEVENT

DESCRIPTION:Discuss project progress and next steps.

DTEND:20250918T160000Z

LOCATION:Conference Room A

DTSTART:20250918T150000Z

SUMMARY:Team Meeting

UID:89bc1ea3-4cd6-48e3-a8c1-16463c1c1a08@89bc.org

END:VEVENT

END:VCALENDAR
```

---

## Notes

* Ensure API credentials are correctly configured for calendar syncing.
* Recurring meetings can be set using phrases like “every Monday at 10 AM.”
* AI understands flexible natural language requests but may require clear date and time formats.

---

## License

This project is for personal and educational use. Commercial use requires permission from the author.

---
