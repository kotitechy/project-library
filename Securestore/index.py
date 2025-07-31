from fastapi import FastAPI, Request, Form, UploadFile, File
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from config.db import db as con
from itsdangerous import URLSafeSerializer
from typing import List
from fastapi.responses import StreamingResponse
from io import BytesIO
import base64
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

SECRET_KEY = "my_super_secret_key_1234567890"
serializer = URLSafeSerializer(SECRET_KEY)

templates = Jinja2Templates(directory="templates")

@app.get('/', response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})

@app.get('/login', response_class=HTMLResponse)
def log_page(request: Request):
    return templates.TemplateResponse('login.html', {'request': request})
user = {
        'urle': "https://cdn-icons-png.flaticon.com/512/3682/3682281.png",
        'name':'',
        'email':''
    }
@app.post('/login', response_class=HTMLResponse)
def login(request: Request, email: str = Form(...), password: str = Form(...)):
    login_user = {
        "email": email,
        "password": password,
    }
    users = con.users.find_one({
        'email': login_user['email'],
        'password': login_user['password']
    })
    if users:
        if (login_user['email'] == users['email']) and (login_user['password'] == users['password']):
            user['name'] = users['username']
            user['email'] = login_user['email']
            # print(user)
            return templates.TemplateResponse('dashboard.html', {'request': request, 'user': user,'files':fetch_files()})
    message = 'Invalid Credentials'
    return templates.TemplateResponse('login.html', {'request': request, 'message': message})



@app.get("/signup", response_class=HTMLResponse)
async def signup_get(request: Request):
    return templates.TemplateResponse("signup.html", {"request": request})

@app.post("/signup", response_class=HTMLResponse)
async def signup_post(request: Request, username: str = Form(...), email: str = Form(...), password: str = Form(...)):
    message = ""
    error = ""
    if "@" not in email or "." not in email:
        error = "Invalid email address."
    elif len(password) < 6:
        error = "Password must be at least 6 characters."
    else:
        login_details = {
            'username': username,
            'email': email,
            'password': password
        }
        con.users.insert_one(dict(login_details))
        return RedirectResponse('/login', status_code=303)
    return templates.TemplateResponse("signup.html", {
        "request": request,
        "message": message,
        "error": error
    })

@app.get("/upload", response_class=HTMLResponse)
async def post_upload(request: Request):
    return templates.TemplateResponse('upload.html', {'request': request, 'user': user})

@app.post("/upload", response_class=HTMLResponse)
async def post_upload(request: Request, files: List[UploadFile] = File(...)):
    message=""
    try:
        c=0
        for file in files:
            content = await file.read()
            file_data = {
            'user': 'shivan',
            'email':user['email'],
            'filename': file.filename,
            'content_type': file.content_type,
            'size':len(content),
            'content': content}
            con.files.insert_one(file_data)
            c+=1
        message = f'Files uploaded {c}'
    except Exception as e:
        message = f"Exception Type: {type(e).__name__}, Message: {str(e)}"
        print(message)
    return templates.TemplateResponse('upload.html', {'request': request, 'user': user,'message':message})

@app.get('/dashboard', response_class=HTMLResponse)
def dashboard(request: Request):
    return templates.TemplateResponse('dashboard.html', {'request': request, 'user': user,'files':fetch_files()})


@app.get("/download/{filename}")
async def download_file(filename: str):
    # Find the file document in MongoDB
    file_doc = con["files"].find_one({"filename": filename})
    if not file_doc:
        return {"error": "File not found"}

    content = file_doc['content']  # bytes stored in MongoDB
    content_type = file_doc.get('content_type', 'application/octet-stream')

    # Create a BytesIO stream from bytes
    file_like = BytesIO(content)

    # Return StreamingResponse to send file as attachment
    return StreamingResponse(file_like, media_type=content_type,headers={"Content-Disposition": f"attachment; filename={filename}"})
def fetch_files():
    files = list(con.files.find({"email": user['email']}, {'_id': 0, 'user': 0}))

    current=[]
    # print(len(files))
    for file in files:
        # binay string to image 
        base64_str = base64.b64encode(file['content']).decode('utf-8')  
        current.append({
            'filename': file['filename'],
            'content_type': file['content_type'],
            'size': file.get('size', 0),
            'base64_content': base64_str
        })

    return current
@app.get("/trash", response_class=HTMLResponse)
async def trash(request: Request):
    return templates.TemplateResponse('trash.html', {'request': request, 'user': user})