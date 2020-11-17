from flask import Flask, request, jsonify, flash, redirect, url_for
from api import app, db
from api.models import User, UserSchema, Clothing, ClothingSchema, Matches, MatchesSchema, Outfit, Favorite, FavoriteSchema, OutfitSchema, Review, ReviewSchema
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
import random

# Init schema
user_schema = UserSchema()
clothing_schema = ClothingSchema();
match_schema = MatchesSchema();
outfit_schema = OutfitSchema();
review_schema = ReviewSchema();
favorite_schema = FavoriteSchema();
users_schema = UserSchema(many=True)
clothings_schema = ClothingSchema(many=True);
matches_schema = MatchesSchema(many=True);
outfits_schema = OutfitSchema(many=True);
reviews_schema = ReviewSchema(many=True);
favorites_schema = FavoriteSchema(many=True);

@app.route('/')
def index():
    return 'index'

########## USERS ##########

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

# GET: Get a user
@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)

# GET: Get current user
@app.route('/currentuser', methods=['GET'])
@login_required
def get_current_user():
    id = current_user.get_id()
    user = User.query.get(id)
    return user_schema.jsonify(user)

# PUT: Update a user
@app.route('/user', methods=['PUT'])
def update_user():
    user = User.query.get(current_user.get_id())

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

# GET/POST: Signup a user
@app.route('/signup', methods=['GET', 'POST'])
def signup():
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

    login_user(user)

    return user_schema.jsonify(user)

# GET/POST: Login a user
@app.route('/signin', methods=['GET', 'POST'])
def login():
    user = User.query.filter_by(username=request.json['username']).first()
    if user is None or not user.check_password(request.json['password']):
        flash('Invalid username or password')
        return redirect('/login')
    login_user(user)
    return user_schema.jsonify(user)

# Logout a user
@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


########## PROFILE ##########

@app.route('/edit_profile', methods=['PUT'])
@login_required
def edit_profile():
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

    db.session.commit()
    flash('Your changes have been saved.')

    return redirect(url_for('edit_profile'))


########## CLOTHING ##########

# POST: Create a clothing item
@app.route('/clothing', methods=['POST'])
@login_required
def add_clothing():
    user_id = current_user.get_id()
    name = request.json['name']
    color = request.json['color']
    occasion = request.json['occasion']
    type = request.json['type']

    new_clothing = Clothing(user_id, name, color, occasion, type)

    db.session.add(new_clothing)
    db.session.commit()

    return clothing_schema.jsonify(new_clothing)

# GET: Get all clothing for the logged in user
@app.route('/clothing', methods=['GET'])
@login_required
def get_all_clothing():
  all_clothing = Clothing.query.filter_by(user_id = current_user.get_id())
  result = clothings_schema.dump(all_clothing)
  return jsonify(result)

# GET: Get a specific clothing
@app.route('/clothing/<id>', methods=['GET'])
@login_required
def get_clothing_id(id):
  result = Clothing.query.get(id)
  return clothing_schema.jsonify(result)

# DELETE: Delete a clothing item
@app.route('/clothing/<id>', methods=['DELETE'])
def delete_clothing(id):
    clothing = Clothing.query.get(id)
    outfits_with_top = Outfit.query.filter_by(top_id = clothing.id)
    outfits_with_bottom = Outfit.query.filter_by(bottom_id = clothing.id)
    outfits_with_shoes = Outfit.query.filter_by(shoes_id = clothing.id)
    # delete all favorites
    for outfit in outfits_with_top:
        Favorite.query.filter_by(outfit_id = outfit.id).delete()
    for outfit in outfits_with_bottom:
        Favorite.query.filter_by(outfit_id = outfit.id).delete()
    for outfit in outfits_with_shoes:
        Favorite.query.filter_by(outfit_id = outfit.id).delete()
    # delete all reviews
    Review.query.filter_by(clothing_id = clothing.id).delete()
    # delete all outfits
    outfits_with_top.delete()
    outfits_with_bottom.delete()
    outfits_with_shoes.delete()
    # delete all matches
    Matches.query.filter_by(clothing_id1 = clothing.id).delete()
    Matches.query.filter_by(clothing_id2 = clothing.id).delete()
    # delete the clothing item
    db.session.delete(clothing)
    db.session.commit()

    return clothing_schema.jsonify(clothing)


########## MATCHES ##########

# POST: Create a match
@app.route('/matches', methods=['POST'])
@login_required
def add_match():
    user_id = current_user.get_id()
    id1 = request.json['clothing_id1']
    id2 = request.json['clothing_id2']

    clothing_article_1 = Clothing.query.get(id1)
    clothing_article_2 = Clothing.query.get(id2)

    if (clothing_article_1.type == clothing_article_2.type):
        return "", "500 invalid match pairing"

    new_match = Matches(id1, id2, user_id)
    update_outfits(new_match)

    db.session.add(new_match)
    db.session.commit()

    return match_schema.jsonify(new_match)

# GET: Get all matches
@app.route('/matches', methods=['GET'])
@login_required
def get_matches():
  all_matches = Matches.query.filter_by(user_id = current_user.get_id())
  result = matches_schema.dump(all_matches)
  return jsonify(result)

# DELETE: Delete a match
@app.route('/matches/<id1>/<id2>', methods=['DELETE'])
def delete_match(id1, id2):

    # delete the match
    match = Matches.query.get({
        "clothing_id1": id1,
        "clothing_id2": id2
    })

    db.session.delete(match)
    db.session.commit()

    return match_schema.jsonify(match)

########## OUTFIT ##########

# Update a user's outfits when they create a new match
def update_outfits(match_added):
    matches = get_matches()
    clothing_article_1 = Clothing.query.get(match_added.clothing_id1)
    clothing_article_2 = Clothing.query.get(match_added.clothing_id2)

    # Generate outfits with all shoes that match at least one of the clothing articles
    if (clothing_article_1.type == 'Top' and clothing_article_2.type == 'Bottom') or (clothing_article_1.type == 'Bottom' and clothing_article_2.type == 'Top'):
        shoes = Clothing.query.filter_by(type = 'Shoes')
        for shoe in shoes:
            match_count = Matches.query.filter_by(clothing_id1 = shoe.id, clothing_id2 = clothing_article_1.id).count() + \
                            Matches.query.filter_by(clothing_id1 = clothing_article_1.id, clothing_id2 = shoe.id).count() + \
                            Matches.query.filter_by(clothing_id1 = shoe.id, clothing_id2 = clothing_article_2.id).count() + \
                            Matches.query.filter_by(clothing_id1 = clothing_article_2.id, clothing_id2 = shoe.id).count()

            if match_count > 0:
                if clothing_article_1.type == 'Top':
                    if Outfit.query.filter_by(user_id = current_user.get_id(), top_id = clothing_article_1.id, bottom_id = clothing_article_2.id, shoes_id = shoe.id).count() == 0:
                        new_outfit = Outfit(user_id=current_user.get_id(), top_id=clothing_article_1.id, bottom_id=clothing_article_2.id, shoes_id=shoe.id)
                        db.session.add(new_outfit)
                        db.session.commit()
                else:
                    if Outfit.query.filter_by(user_id = current_user.get_id(), top_id = clothing_article_2.id, bottom_id = clothing_article_1.id, shoes_id = shoe.id).count() == 0:
                        new_outfit = Outfit(user_id=current_user.get_id(), top_id=clothing_article_2.id, bottom_id=clothing_article_1.id, shoes_id=shoe.id)
                        db.session.add(new_outfit)
                        db.session.commit()

    # Generate outfits with all bottoms that match at least one of the clothing articles
    elif (clothing_article_1.type == 'Top' and clothing_article_2.type == 'Shoes') or (clothing_article_1.type == 'Shoes' and clothing_article_2.type == 'Top'):
        bottoms = Clothing.query.filter_by(type = 'Bottom')
        for bottom in bottoms:
            match_count = Matches.query.filter_by(clothing_id1 = bottom.id, clothing_id2 = clothing_article_1.id).count() + \
                            Matches.query.filter_by(clothing_id1 = clothing_article_1.id, clothing_id2 = bottom.id).count() + \
                            Matches.query.filter_by(clothing_id1 = bottom.id, clothing_id2 = clothing_article_2.id).count() + \
                            Matches.query.filter_by(clothing_id1 = clothing_article_2.id, clothing_id2 = bottom.id).count()

            if match_count > 0:
                if clothing_article_1.type == 'Top':
                    if Outfit.query.filter_by(user_id = current_user.get_id(), top_id = clothing_article_1.id, bottom_id = bottom.id, shoes_id = clothing_article_2.id).count() == 0:
                        new_outfit = Outfit(user_id=current_user.get_id(), top_id=clothing_article_1.id, bottom_id=bottom.id, shoes_id=clothing_article_2.id)
                        db.session.add(new_outfit)
                        db.session.commit()
                else:
                    if Outfit.query.filter_by(user_id = current_user.get_id(), top_id = clothing_article_2.id, bottom_id = bottom.id, shoes_id = clothing_article_1.id).count() == 0:
                        new_outfit = Outfit(user_id=current_user.get_id(), top_id=clothing_article_2.id, bottom_id=bottom.id, shoes_id=clothing_article_1.id)
                        db.session.add(new_outfit)
                        db.session.commit()

    # Generate outfits with all tops that match at least one of the clothing articles
    else:
        tops = Clothing.query.filter_by(type = 'Top')
        for top in tops:
            match_count = Matches.query.filter_by(clothing_id1 = top.id, clothing_id2 = clothing_article_1.id).count() + \
                            Matches.query.filter_by(clothing_id1 = clothing_article_1.id, clothing_id2 = top.id).count() + \
                            Matches.query.filter_by(clothing_id1 = top.id, clothing_id2 = clothing_article_2.id).count() + \
                            Matches.query.filter_by(clothing_id1 = clothing_article_2.id, clothing_id2 = top.id).count()

            if match_count > 0:
                if clothing_article_1.type == 'Bottom':
                    if Outfit.query.filter_by(user_id = current_user.get_id(), top_id = top.id, bottom_id = clothing_article_1.id, shoes_id = clothing_article_2.id).count() == 0:
                        new_outfit = Outfit(user_id=current_user.get_id(), top_id=top.id, bottom_id=clothing_article_1.id, shoes_id=clothing_article_2.id)
                        db.session.add(new_outfit)
                        db.session.commit()
                else:
                    if Outfit.query.filter_by(user_id = current_user.get_id(), top_id = top.id, bottom_id = clothing_article_2.id, shoes_id = clothing_article_1.id).count() == 0:
                        new_outfit = Outfit(user_id=current_user.get_id(), top_id=top.id, bottom_id=clothing_article_2.id, shoes_id=clothing_article_1.id)
                        db.session.add(new_outfit)
                        db.session.commit()

# GET: Get one outfit
@app.route('/outfit', methods=['GET'])
@login_required
def get_outfit():
    all_outfits = Outfit.query.filter_by(user_id = current_user.get_id())
    result = random.choice(outfits_schema.dump(all_outfits))
    return jsonify(result)

# GET: Get all outfits
@app.route('/outfits', methods=['GET'])
@login_required
def get_outfits():
    all_outfits = Outfit.query.filter_by(user_id = current_user.get_id())
    result = outfits_schema.dump(all_outfits)
    return jsonify(result)

# GET: Get one specific outfit by id
@app.route('/outfit/<id>', methods=['GET'])
@login_required
def get_outfit_id(id):
    outfit = Outfit.query.filter_by(id = id)
    return outfit_schema.jsonify(result)

########## FAVORITES ##########

# GET: Get all favorited items for current user
@app.route('/favorite', methods=['GET'])
@login_required
def get_favorites():
    all_favorites = Favorite.query.filter_by(user_id = current_user.get_id())
    result = favorites_schema.dump(all_favorites)
    return jsonify(result)

# POST: Add an outfit to favorited table
@app.route('/favorite', methods=['POST'])
@login_required
def add_favorite():
    user_id = current_user.get_id()
    outfit_id = request.json['outfit_id']
    name = request.json['name']
    description = request.json['description']
    rating = request.json['rating']

    new_favorite = Favorite(outfit_id, user_id, name, description, rating)

    db.session.add(new_favorite)
    db.session.commit()

    return favorite_schema.jsonify(new_favorite)

########## REVIEW ##########

# POST: Create a review
@app.route('/review', methods=['POST'])
@login_required
def add_review():
    user_id = current_user.get_id()
    clothing_id = request.json['clothing_id']
    clothing_name = Clothing.query.get(clothing_id).name
    impression = request.json['impression']
    stars = request.json['rating']
    text = request.json['text']

    if Review.query.filter_by(clothing_id=clothing_id).count() > 0:
        return "", "500 Review of item already exists"

    new_review = Review(user_id, clothing_id, clothing_name, impression, stars, text)

    db.session.add(new_review)
    db.session.commit()

    return review_schema.jsonify(new_review)

# GET: Get all reviews for the logged in user
@app.route('/reviews', methods=['GET'])
@login_required
def get_reviews():
  all_reviews = Review.query.filter_by(user_id = current_user.get_id())
  result = reviews_schema.dump(all_reviews)
  return jsonify(result)

# DELETE: Delete a review
@app.route('/review/<id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return review_schema.jsonify(review)

########## RUN SERVER ##########

if __name__ == '__main__':
    app.run(debug=True)
