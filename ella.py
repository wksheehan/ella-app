from api import app, db
from api.models import User, Clothing, Outfit, Matches, Belongs, UserSchema, \
                       ClothingSchema, OutfitSchema, MatchesSchema, BelongsSchema, \
                       Favorite, FavoriteSchema

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'UserSchema': UserSchema, \
    'Clothing': Clothing, 'ClothingSchema': ClothingSchema, 'Outfit': Outfit, \
    'OutfitSchema': OutfitSchema, 'Matches': Matches, \
    'MatchesSchema': MatchesSchema, 'Belongs': Belongs, \
    'BelongsSchema': BelongsSchema, 'Review': Review, \
    'ReviewSchema': ReviewSchema, 'Favorite': Favorite, \
    'FavoriteSchema': FavoriteSchema}
