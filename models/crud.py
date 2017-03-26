from connect import db
from bson.objectid import ObjectId

users = db.users
projects = db.projects
commits = db.commits

projects.create_index([('projectTags', 'text'),('domain' , 'text'), ('projectDescription','text')])


def insert(document, collection_name):
    if collection_name == "projects":
        return projects.insert_one(document)

    elif collection_name == "commits":
        return commits.insert_one(document)

    else:
        return users.insert_one(document)


def find(document, collection_name):
    if collection_name == "projects":
        return projects.find(document)
    elif collection_name == "commits":
        return commits.find(document)
    else:
        return users.find(document)


def find_unique(document, collection_name):
    if collection_name == "projects":
        return projects.find_one(document)

    elif collection_name == "commits":
        return commits.find_one(document)

    else:
        return users.find_one(document)


def update(id, modify, collection_name):
    if collection_name == "projects":
        # upsert false will insert a new document is id not found
        return projects.update({'_id': ObjectId(id)}, modify, upsert=False)

    elif collection_name == "commits":
        return commits.update({'_id': ObjectId(id)}, modify, upsert=False)

    else:
        return users.update({'_id': ObjectId(id)}, modify, upsert=False)


def delete(document, collection_name):
    if collection_name == "projects":
        return projects.delete_one(document)

    elif collection_name == "commits":
        return users.delete_one(document)
    else:
        return users.delete_one(document)


def aggregate(id, collection_name):
    if collection_name == "projects":
        return projects.aggregate([{'$match': {'owner': id}}, {'$group': {'_id': 'null', 'count': {'$sum': 1}}}])

def aggregate_domain(id , collection_name):
    if collection_name == "projects":
        return projects.aggregate([{'$match' : {'projectMembers' : id}} , {'$group' : {'_id' : '$domain' , 'count' : {'$sum' : 1}}}])

def aggregateFunc(id, collection_name):
    if collection_name == "projects":
        return projects.aggregate([{'$match' : {'projectMembers' : id}} , {'$group' : {'_id': '$domain', 'projectName' : {'$push' : '$projectName'}, 'projectDescription' : {'$push': '$projectDescription'}, 'projectId' : {'$push' : '$_id'}, 'projectOwner' : {'$push' : '$owner'}}}])

def searchFunc(chips):

    cursor =  projects.find({'$text' : {'$search' :chips}})
    #cursor = db.command('text','chips',search=chips)
   # projects.drop_indexes()
    return cursor
