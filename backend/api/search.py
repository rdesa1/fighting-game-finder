from flask import Blueprint

# Create a blueprint instance
search_bp = Blueprint('search', __name__)

@search_bp.route('/')
def get_users():
    return {"message": "List of users"}