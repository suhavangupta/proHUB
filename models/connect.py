import pymongo

client = pymongo.MongoClient()
db = client.prohub_db

result = db.commits.create_index([('sha_id', pymongo.ASCENDING)], unique=True)
#print result
#list(db.commits.index_information())


