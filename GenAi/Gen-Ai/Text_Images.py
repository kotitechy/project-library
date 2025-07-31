# To run this code you need to install the following dependencies:
# pip install google-genai

from google import genai
import os

def generate(q):
    client = genai.Client(api_key="AIzaSyAC9FKrqPTbuuAroSAjvVeUuxLG0vShmk0")

    result = client.models.generate_images(
        model="models/imagen-4.0-generate-preview-06-06",
        prompt=q,
        config=dict(
            number_of_images=1,
            output_mime_type="image/jpeg",
            person_generation="ALLOW_ADULT",
            aspect_ratio="1:1",
        ),
    )

    if not result.generated_images:
        print("No images generated.")
        return

    if len(result.generated_images) != 1:
        print("Number of images generated does not match the requested number.")

    for n, generated_image in enumerate(result.generated_images):
        generated_image.image.save(f"output{n}.jpg")
