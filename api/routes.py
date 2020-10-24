from flask import Flask, request, jsonify
from api import app, db
from api.models import User, UserSchema
from flask_login import current_user, login_user, logout_user
from werkzeug.urls import url_parse

# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# POST: Create a user
@app.route('/user', methods=['POST'])
def add_user():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    location = request.json['location']

    user = User(username=username, email=email)
    user.set_password(password)
    user.first_name = first_name
    user.last_name = last_name
    user.location = location

    db.session.add(user)
    db.session.commit()

    return user_schema.jsonify(user)

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
    email = request.json['email']
    password = request.json['password']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    location = request.json['location']

    user.username = username
    user.email = email
    user.set_password(password)
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

# GET/POST: Login a user
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    else:
        user = User(username=request.json['username'], email=request.json['email'])
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=request.json['remember_me'])
        return redirect(url_for('home'))

# GET/POST: Login a user
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    else:
        user = User.query.filter_by(username=request.json['username']).first()
        if user is None or not user.check_password(request.json['password']):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=request.json['remember_me'])
        return redirect(url_for('home'))

# Logout a user
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))

# Run Server
if __name__ == '__main__':
    app.run(debug=True)
