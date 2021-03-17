from flask import Flask
import os

app = Flask(__name__)


@app.route('/')
def index():
    return "Tutaj będzie najlepsza ankieta świata"


@app.route('/env')
def check_env_variables():
    return str(os.environ)


@app.route('/przyklad')
def jakas_przyklad():
    return "Potrzeba backendowca"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
