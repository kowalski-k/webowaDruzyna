from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return "Tutaj będzie najlepsza ankieta świata"


if __name__ == "__main__":
    app.run()
