from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from config import Config

# Init flask
app = Flask(__name__)

# Database
app.config.from_object(Config)

# Init database
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)

# Init migrate
migrate = Migrate(app, db)

from api import routes, models
