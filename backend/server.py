from flask import Flask, request, jsonify
from flask_cors import CORS
# import cv2
# import face_recognition
# import numpy as np
import os
import logging

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/api/upload-video', methods=['POST'])
def upload_video():
    binary_data = request.data

    app.logger.debug(f'Received data of type: {type(binary_data)} and size: {len(binary_data)} bytes')

    return jsonify({"message": "Video uploaded successfully"})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)