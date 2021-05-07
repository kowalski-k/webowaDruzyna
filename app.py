from flask import Flask, render_template
import os
from tools.db_operations import DBOperations

app = Flask(__name__)
db = DBOperations()


@app.route('/')
@app.route('/index.html')
def index():
    return render_template("index.html")


@app.route('/env')
def check_env_variables():
    return str(os.environ)


@app.route('/creators.html')
def creators():
    return render_template("creators.html")


@app.route('/form.html')
def form():
    form_data = db.get_all_questions()
    return render_template("form.html", data=form_data)


@app.route('/charts.html')
def charts():
    return render_template("charts.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
