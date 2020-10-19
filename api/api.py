import time, os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

# Init flask
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/ella-api"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init database
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)

# Init migrate
migrate = Migrate(app, db)

# User class/model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    location = db.Column(db.String(100))

    def __init__(self, username, password, first_name, last_name, location):
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.location = location

# User schema
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'username', 'password', 'first_name', 'last_name', 'location')

# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Create a user
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

# Get all users
@app.route('/user', methods=['GET'])
def get_users():
  all_users = User.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)

# Get single user
@app.route('/user/<id>', methods=['GET'])
def get_user(id):
  user = User.query.get(id)
  return user_schema.jsonify(user)

# Update a user
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

# Delete a user
@app.route('/user/<id>', methods=['DELETE'])
def delete_user(id):
  user = User.query.get(id)
  db.session.delete(user)
  db.session.commit()

  return user_schema.jsonify(user)

# Get Time
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

# Run Server
if __name__ == '__main__':
  app.run(debug=True)
