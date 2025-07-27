from flask import Blueprint

# Create a blueprint instance
search_bp = Blueprint('search', __name__)

@search_bp.route('/<query>', methods=['GET'])
def get_query_results(query):
    return query