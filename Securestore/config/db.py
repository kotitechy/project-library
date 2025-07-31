from pymongo import MongoClient

# uri
MONGO_URI = "mongodb+srv://shiva36300:Shiva@cluster0.ri2pj2a.mongodb.net/db1?retryWrites=true&w=majority&authSource=admin"

client = MongoClient(MONGO_URI)
db = client['securestore']
