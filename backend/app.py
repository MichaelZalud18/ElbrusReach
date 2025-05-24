from flask import Flask, jsonify
import os
from pymongo import MongoClient
import datetime

app = Flask(__name__)

# Environment variable for MongoDB URI
mongo_uri = os.getenv("MONGO_URI", "mongodb://host.docker.internal:27017/media_manifest")
client = MongoClient(mongo_uri)
db = client.get_database()

@app.route('/')
def home():
    return jsonify({"message": "Elbrus Reach Backend operational!"})

@app.route('/health')
def health_check():
    try:
        # Attempt to ping the database to check connectivity
        client.admin.command('ping')
        db_status = "Connected"
    except Exception as e:
        db_status = f"Failed ({e})"

    return jsonify({
        "status": "OK",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "database_status": db_status
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)