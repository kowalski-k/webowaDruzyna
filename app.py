from flask import Flask, render_template
import os
from tools import db_operations

app = Flask(__name__)
db_handler = db_operations.DBOperations()


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
    request_data = {}
    question_id_begging = "question"
    for i, row in enumerate(db_handler.get_all_questions()):
        question = row[1]
        question_id = question_id_begging + str(i+1)
        request_data[question_id] = question
    return render_template("form.html", **request_data)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
