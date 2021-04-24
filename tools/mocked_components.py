from db_operations import DBOperations
import time
from datetime import datetime
import request

def get_form_source1(url):
    db = DBOperations()
    questions = db.get_all_questions()
    data = []
    keys_to_match = {}
    for question in questions:
        question_id = question[0]
        question_text = question[1]
        answers = db.get_answer_types(question_id)
        question_answer_data = {}
        answer_id_to_recognize = {key: value for key, value in enumerate([answer[0] for answer in answers])}
        possible_answers = {key: answer for key, answer in enumerate([answer[1] for answer in answers])}
        question_answer_data['question_id'] = question_id
        question_answer_data['question_text'] = question_text
        question_answer_data['possible_answers'] = possible_answers
        data.append(question_answer_data)
        keys_to_match[question_id] = answer_id_to_recognize

    r = request.post(url, data)
    return data, keys_to_match

def form_results1(url):
    r = request.post(url, data)
    forms_data = r.json()
    #form_data={question_id: answer_formatted_id}
    db = DBOperations()
    current_timestamp = datetime.now()
    _, keys_to_match = get_form_source1()
    for question_id, answer in forms_data.items():
            answer_id = keys_to_match[question_id][answer]
            db.add_answer(answer_id, current_timestamp)


def get_all_plots_data():
    # dane do wykresu
    # kto to będzie robił musi sobie wymyślić w jakiej formie chce mieć dane, raczej tu nie ma ograniczeń
    #
    return {
        "gender_pie_plot": {
            "male": 43.7,
            "female": 56.3
        },
        "specialty_pie_plot": {
            "ib": 13.4,
            "it": 55.3,
            "bi": 31.3
        }
    }
