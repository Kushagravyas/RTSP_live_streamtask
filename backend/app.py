from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Config
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

# Connect to the overlays collection
db = mongo.db
overlays_collection = db.overlays

# Routes
@app.route('/overlays', methods=['GET'])
def get_overlays():
    try:
        overlays = overlays_collection.find()
        response = []
        for overlay in overlays:
            response.append({
                '_id': str(overlay['_id']),
                'text': overlay['text'],
                'logo_url': overlay['logo_url'],
                'position': overlay['position'],
                'size': overlay['size']
            })
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    if not data or not data.get('text') or not data.get('logo_url'):
        return jsonify({'error': 'Invalid input'}), 400

    overlay_id = overlays_collection.insert_one({
        'text': data.get('text'),
        'logo_url': data.get('logo_url'),
        'position': data.get('position'),
        'size': data.get('size')
    }).inserted_id
    return jsonify({'_id': str(overlay_id)}), 201

@app.route('/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    try:
        data = request.json
        overlays_collection.update_one({'_id': ObjectId(id)}, {"$set": {
            'text': data.get('text'),
            'logo_url': data.get('logo_url'),
            'position': data.get('position'),
            'size': data.get('size')
        }})
        return jsonify({'msg': 'Overlay updated'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    try:
        overlays_collection.delete_one({'_id': ObjectId(id)})
        return jsonify({'msg': 'Overlay deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
