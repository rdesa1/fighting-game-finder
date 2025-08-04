from flask import Flask # import flask module
from flask_debugtoolbar import DebugToolbarExtension # For the Flask debug toolbar
import os
from api.search import search_bp  # Import blueprint
  
# create the app
app = Flask(__name__)

# register blueprints
app.register_blueprint(search_bp, url_prefix='/search')

# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# a simple page that says hello
@app.route('/')
def hello():
    return 'Hello, World!'