import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/ella-api"
    SQLALCHEMY_DATABASE_URI = "postgresql://ella:ella@vcm-17601.vm.duke.edu:5432/testdb"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
