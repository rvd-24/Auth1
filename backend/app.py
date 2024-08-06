from flask import Flask, jsonify,request
from flask_cors import CORS,cross_origin
from base64 import b64decode
import jwt
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
import requests

jwks_uri = 'https://login.microsoftonline.com/common/discovery/v2.0/keys'


app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": "https://easyauth-frontend24.azurewebsites.net",
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
    }})

@app.route('/')
def home():
    return "Hello from the backend: The routes are /public , /private and /token. Auth."

@app.route('/token')
def tokenfunc():
    return str(request.headers)

@app.route('/api/user-info')
def user_info():
    auth_header = request.headers
    return str(auth_header)
    

@app.route('/public')
@cross_origin()
def publicapi():
    x_ms_client_principal = request.headers.get('X-MS-CLIENT-PRINCIPAL')
    return jsonify({"Message":"Hello from the public endpoint!","msclient":str(x_ms_client_principal)})

@app.route('/private')
@cross_origin()
def privateapi():
    # jwkeys = requests.get(jwks_uri).json()['keys']

    # token_key_id = jwt.get_unverified_header(token)['kid']
    # jwk = [key for key in jwkeys if key['kid'] == token_key_id][0]
    # der_cert = b64decode(jwk['x5c'][0])
    # cert = x509.load_der_x509_certificate(der_cert, default_backend())
    # public_key = cert.public_key()
    # pem_key = public_key.public_bytes(encoding=serialization.Encoding.PEM, format=serialization.PublicFormat.SubjectPublicKeyInfo)
    # token_claims = jwt.decode(token, pem_key, audience=client_id)
    return jsonify({"Message":"Hello from the private endpoint!"})

if __name__ == "__main__":
    app.run(debug = True)