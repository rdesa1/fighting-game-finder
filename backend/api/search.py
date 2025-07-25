from flask import Blueprint

# Create a blueprint instance
search_bp = Blueprint('search', __name__, url_prefix='/search')

@search_bp.route('/search')
def get_locations():
    return {"message": "List of users"}