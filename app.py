from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route('/')
def index():
    return "Tutaj będzie najlepsza ankieta świata"


@app.route('/env')
def check_env_variables():
    return str(os.environ)


@app.route('/base')
def base():
    return render_template("base.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
