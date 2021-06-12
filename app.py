from flask import Flask, render_template, request, jsonify
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


@app.route('/form.html')
def form():
    form_data = db.get_all_questions()
    return render_template("form.html", data=form_data)


@app.route('/form_results', methods=['POST'])
def form_results():
    data = request.get_json()
    db.submit_form_answers(data)
    return jsonify(data)


@app.route('/results.html')
def result():
    form_data = db.get_all_questions()
    form_answers = db.get_all_answers()
    return render_template("results.html", data=form_data, answers=form_answers)

@app.route('/best_results')
def best_scores():
    form_answers = db.get_all_answers()
    return jsonify(form_answers)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
