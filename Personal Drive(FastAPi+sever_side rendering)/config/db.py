from pymongo import MongoClient

# uri
MONGO_URI = "Your uri"

client = MongoClient(MONGO_URI)
db = client['securestore']
