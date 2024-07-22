from flask import Flask
from services.images import list_public_urls

app = Flask(__name__)
from flask import Flask

from flask_cors import CORS
CORS(app, origins="http://localhost:3000", supports_credentials=True, methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])


@app.route('/')
def index():
    return 

@app.route('/api/images')
def get_images():
    image_urls = list_public_urls("test-sidahmed-bucket")
    return {'image_urls': image_urls}

if __name__ == "__main__":
    app.run(debug=True)