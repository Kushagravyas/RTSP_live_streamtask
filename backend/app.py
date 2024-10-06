from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up MongoDB connection
client = MongoClient('mongodb://localhost:27017/')  # Adjust the URI as needed
db = client['your_database_name']  # Replace with your database name
overlays_collection = db['overlays']

@app.route('/overlays', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find())
    for overlay in overlays:
        overlay['_id'] = str(overlay['_id'])  # Convert ObjectId to string
    return jsonify(overlays), 200

@app.route('/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    print("Received data:", data)  # Debug line to see received data
    if not data or not data.get('text') or not data.get('logo_url'):
        return jsonify({'error': 'Invalid input'}), 400

    overlay_id = overlays_collection.insert_one({
        'text': data.get('text'),
        'logo_url': data.get('logo_url'),
        'position': data.get('position'),
        'size': data.get('size')
    }).inserted_id
    
    # Return a JSON response with the overlay ID
    return jsonify({'_id': str(overlay_id)}), 201

@app.route('/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    result = overlays_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 1:
        return jsonify({'message': 'Overlay deleted successfully'}), 200
    else:
        return jsonify({'error': 'Overlay not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)