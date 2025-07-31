# To run this code you need to install the following dependencies:
# pip install google-genai

from google import genai


def generate(q):
    from google.genai import types
    client = genai.Client(
        api_key="AIzaSyAC9FKrqPTbuuAroSAjvVeUuxLG0vShmk0",
    )

    model = "learnlm-2.0-flash-experimental"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=q),
                
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        print(chunk.text, end="")
