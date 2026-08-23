from flask import Flask # import flask module
from flask_cors import CORS
import os
from api.search import search_bp  # Import blueprint
  
# create the app
app = Flask(__name__)

# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


frontend_url = os.getenv(
    "FRONTEND_URL", # allow the deployed frontend in production
    "http://localhost:5173" # allow localhost to be used locally
)

CORS(
    app,
    resources={
        r"/search*": {
            "origins": frontend_url
            }
        }
)

# register blueprints
app.register_blueprint(search_bp, url_prefix='/search')

# a simple page that says hello
@app.route('/')
def hello():
    return 'Hello, World!'