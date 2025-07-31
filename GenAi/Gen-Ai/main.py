

from fastapi import FastAPI
from text_audio import generate_speech
from text_image import image
from QNA import generate
from Role import chat
from FileUpload import fileUpload
from FileUpload import ask_questions
from Text_Images import generate 
from pydantic import BaseModel



app= FastAPI()

class values(BaseModel):
    question : str
    image_prompt : str

@app.post('/')
def chats(question: str):
    res = chat(question)  
    return res
@app.post('/speechgen')
def speechgen(question : str):
    res = generate_speech(question)  
    return res
@app.post('/file')
def file(question: str):
    res = fileUpload(question)
    return res
@app.post('/askquestion')
def askquestion(question : str):
    res = ask_questions(question)
    return res
@app.post('/imagegen')
def imagegen(image_prompt : str):
    res = generate(image_prompt)
    return res
@app.post('/imagedata')
def imagedata(image_prompt : str):
    res = image(image_prompt)
    return res
@app.post('/qna')
def qna(question : str):
    res = generate(question)
    return res
