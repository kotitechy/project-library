from fastapi import FastAPI, Form, HTTPException, Request, UploadFile, File
from typing import List, Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from data import property_list

app = FastAPI()
# property_list = []



class PropertyModel(BaseModel):
    id: int
    name: str
    address: str
    rent: int
    surveyNumber: str
    renter_name: str
    renterAddress: str
    renterPhone: str
    rentStartDate: str  
    idType: str
    documentNumber: str

    idProofFile: Optional[list[str]] = None
    rentalAgreement: Optional[list[str]] = None
    profilePhoto: Optional[list[str]] = None


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get('/')
def home():
    return {"message": "Server running"}

@app.post('/login')
def login(name: str = Form(...), passwd: str = Form(...)):
    print(f"Username: {name}, Password: {passwd}")
    return {"message": f"Hello, {name}!"}

@app.post('/register')
def register(
    fullname: str = Form(...), 
    email: str = Form(...),
    phone: str = Form(...),
    country: str = Form(...),
    state: str = Form(...),
    city: str = Form(...),
    purpose: str = Form(...),
    password: str = Form(...),
    repassword: str = Form(...),
    
    ):
    data = {
        "fullname": fullname,   
        "email": email,
        "phone": phone,
        "country": country,
        "state": state,
        "city": city,
        "purpose": purpose,
        "password": password,
        "repassword": repassword,
    }
    print(data)
    return {"message": f"User {fullname} registered successfully!"}
# print(property_list[0])

@app.get('/properties')
def list_properties():
    return  property_list

@app.post('/addproperty')
def add_property(
    category: str = Form(...),
    name: str = Form(...),
    address: str = Form(...),
    rent: str = Form(...),
    renterName: str = Form(...),
    renterAddress: str = Form(...),
    phone: str = Form(...),
    startDate: str = Form(...),
    documentNumber: str = Form(...),
):
    property_data = {
        "category": category,
        "name": name,
        "address": address,
        "rent": rent,
        "renterName": renterName,
        "renterAddress": renterAddress,
        "phone": phone,
        "startDate": startDate,
        "documentNumber": documentNumber
    }
    property_list.append(property_data)
    print(property_data)
    list_properties()
    print(len(property_list))
    return 'Data added successfully'


bills=['billno','date','amount','status']
bills_list=[1,'2024-06-01',500,'paid',
            2,'2024-06-05',750,'unpaid',
            3,'2024-06-10',300,'paid',
            4,'2024-06-15',450,'unpaid',
            5,'2024-06-20',600,'paid',
            6,'2024-06-25',800,'unpaid',
            7,'2024-06-30',550,'paid',
            8,'2024-07-05',700,'unpaid',
            9,'2024-07-10',400,'paid',
            10,'2024-07-15',650,'unpaid']
@app.get('/bills')
def list_bills():
    bills_data = []
    for i in range(0, len(bills_list), 4):
        bill = {
            "billno": bills_list[i],
            "date": bills_list[i+1],
            "amount": bills_list[i+2],  
            "status": bills_list[i+3]
        }
        bills_data.append(bill)
    return bills_data


@app.get('/messages')
def messages():
    messages = [
        {"name": "Shiva Charan", "lastMessage": "Hey! Got your bill.", "time": "2:30 PM", "unread": 0},
        {"name": "Raj Kumar", "lastMessage": "Can we reschedule?", "time": "1:10 PM", "unread": 0},
        {"name": "Anita Rao", "lastMessage": "Thank you 🙏", "time": "Yesterday", "unread": 0},
        {"name": "Rahul Verma", "lastMessage": "Invoice received.", "time": "Mon", "unread": 0},
    ]
    return messages

# @app.put("/uproperty/{id}")
# async def update_property(
#     id: int,
#     name: str = Form(...),
#     address: str = Form(...),
#     rent: int = Form(...),
#     surveyNumber: str = Form(...),
#     renter_name: str = Form(...),
#     renterAddress: str = Form(...),
#     renterPhone: str = Form(...),
#     rentStartDate: str = Form(...),
#     idType: str = Form(...),
#     documentNumber: str = Form(...),
#     idProofFile: List[UploadFile] = File([]),
#     rentalAgreement: List[UploadFile] = File([]),
#     profilePhoto: List[UploadFile] = File([]),
# ):
#             data={
#                 "id": id,
#                 "name": name,
#                 "address": address,
#                 "rent": rent,
#                 "surveyNumber": surveyNumber,
#                 "renter_name": renter_name,
#                 "renterAddress": renterAddress,
#                 "renterPhone": renterPhone,
#                 "rentStartDate": rentStartDate,
#                 "idType": idType,
#                 "documentNumber": documentNumber,
#                 "idProofFile": [file.filename for file in idProofFile],
#                 "rentalAgreement": [file.filename for file in rentalAgreement],
#                 "profilePhoto": [file.filename for file in profilePhoto],
#             }
#             # print(dict(data))  
#             for p in property_list:
#                     if p['id']==id:
#                         p.update(data)
#                         print('updated')
#                         return {"message": "Property updated successfully", "property": '1'}
#                     raise HTTPException(status_code=404, detail="Property not found")

    
# from pydantic import BaseModel
# from typing import Optional, List

class PropertyUpdate(BaseModel):
    name: str
    address: str
    rent: int
    surveyNumber: str
    renter_name: str
    renterAddress: str
    renterPhone: str
    rentStartDate: str
    idType: str
    documentNumber: str
    idProofFile: Optional[List[str]] = None
    rentalAgreement: Optional[List[str]] = None
    profilePhoto: Optional[List[str]] = None


    
# @app.put("/uproperty/{id}")
# async def update_property(id: int, updated: PropertyUpdate):
#     for p in property_list:
#         if p['id'] == id:
#             p.update(updated)
#             print('updated')
#             return {"message": "Property updated successfully", "property": p}

#     # Only raise 404 after checking all items
#     raise HTTPException(status_code=404, detail="Property not found")

@app.post("/uproperty/{id}")
async def update_property(
    id: int,
    name: str = Form(...),
    address: str = Form(...),
    rent: int = Form(...),
    surveyNumber: str = Form(...),
    renter_name: str = Form(...),
    renterAddress: str = Form(...),
    renterPhone: str = Form(...),
    rentStartDate: str = Form(...),
    idType: str = Form(...),
    documentNumber: str = Form(...),
    idProofFile: Optional[List[UploadFile]] = File(None),
    rentalAgreement: Optional[List[UploadFile]] = File(None),
    profilePhoto: Optional[List[UploadFile]] = File(None),
):
    # Find the property
    for p in property_list:
        if p['id'] == id:
            # Update text fields
            p.update({
                "name": name,
                "address": address,
                "rent": rent,
                "surveyNumber": surveyNumber,
                "renter_name": renter_name,
                "renterAddress": renterAddress,
                "renterPhone": renterPhone,
                "rentStartDate": rentStartDate,
                "idType": idType,
                "documentNumber": documentNumber,
            })

            # Update files (store filenames for now)
            if idProofFile:
                p["idProofFile"] = [file.filename for file in idProofFile]
            if rentalAgreement:
                p["rentalAgreement"] = [file.filename for file in rentalAgreement]
            if profilePhoto:
                p["profilePhoto"] = [file.filename for file in profilePhoto]

            print(f"Property {id} updated:", p)
            return {"message": "Property updated successfully", "property": p}

    raise HTTPException(status_code=404, detail="Property not found")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
