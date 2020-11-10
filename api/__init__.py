from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_login import LoginManager
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

# Init login
login_manager = LoginManager(app)

from api import routes, models
