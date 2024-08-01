import os
from flask import Flask, request, render_template_string
from services.images import list_public_urls
from flask_mail import Mail,Message
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True, methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('BABYLON_EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('BABYLON_EMAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route('/')
def index():
    return 

@app.route('/api/images')
def get_images():
    image_urls = list_public_urls("test-sidahmed-bucket")
    return {'image_urls': image_urls}


@app.route('/api/send-mail',methods=['POST'])
def sendMail():
    body = request.get_json()
    user_email = body["email"]
    user_name = body["name"]
    user_message = body["message"]
    msg = Message('Babylon House : un client vous a contacté', sender=os.getenv('BABYLON_EMAIL'),recipients=[os.getenv('BABYLON_EMAIL')])

    # Define the HTML content
    html_content = """
        <p>🏠 <strong>Babylon House : Un client vous a contacté</strong> 🏠</p>
        <p><strong>Nom :</strong> {user_name}</p>
        <p><strong>Adresse email  :</strong> {user_email}</p>
        <p><strong>Message du client :</strong></p>
        <p>{user_message}</p>
        <br>
    """.format(user_name=user_name, user_email=user_email, user_message=user_message)

        # Set the HTML content for the email
    msg.html = render_template_string(html_content)
    mail.send(msg)


    return '<h2>Mail sended successffully</h2>'

if __name__ == "__main__":
    app.run(debug=True)