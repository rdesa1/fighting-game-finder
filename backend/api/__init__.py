from flask import Flask
from search import search

def create_app():
    app = Flask(__name__)
    app.register_blueprint(search)  

    return app