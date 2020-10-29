from flask import Flask, request, jsonify
from api import app, db
from api.models import User, UserSchema, Clothing, ClothingSchema

# Init schema
user_schema = UserSchema()
clothing_schema = ClothingSchema();
users_schema = UserSchema(many=True)
clothings_schema = ClothingSchema(many=True);

# POST: Create a user
@app.route('/user', methods=['POST'])
def add_user():
  username = request.json['username']
  password = request.json['password']
  first_name = request.json['first_name']
  last_name = request.json['last_name']
  location = request.json['location']

  new_user = User(username, password, first_name, last_name, location)

  db.session.add(new_user)
  db.session.commit()

  return user_schema.jsonify(new_user)

# GET: Get all users
@app.route('/user', methods=['GET'])
def get_users():
  all_users = User.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)

# GET: Get single user
@app.route('/user/<id>', methods=['GET'])
def get_user(id):
  user = User.query.get(id)
  return user_schema.jsonify(user)

# PUT: Update a user
@app.route('/user/<id>', methods=['PUT'])
def update_user(id):
  user = User.query.get(id)

  username = request.json['username']
  password = request.json['password']
  first_name = request.json['first_name']
  last_name = request.json['last_name']
  location = request.json['location']

  user.username = username
  user.password = password
  user.first_name = first_name
  user.last_name = last_name
  user.location = location

  db.session.commit()

  return user_schema.jsonify(user)

# DELETE: Delete a user
@app.route('/user/<id>', methods=['DELETE'])
def delete_user(id):
  user = User.query.get(id)
  db.session.delete(user)
  db.session.commit()

  return user_schema.jsonify(user)

########## CLOTHING ##########

# POST: Create a clothing item
@app.route('/clothing', methods=['POST'])
def add_clothing():
    name = request.json['name']
    color = request.json['color']
    occasion = request.json['occasion']
    type = request.json['type']

    new_clothing = Clothing(name, color, occasion, type)

    db.session.add(new_clothing)
    db.session.commit()

    return clothing_schema.jsonify(new_clothing)

# GET: Get all clothing
@app.route('/clothing', methods=['GET'])
def get_clothing():
  all_clothing = Clothing.query.all()
  result = clothing_schema.dump(all_clothing)
  return jsonify(result)

# Run Server
if __name__ == '__main__':
  app.run(debug=True)
