import pyodbc
from configparser import ConfigParser
from datetime import datetime

config_object = ConfigParser()
config_object.read("config.ini")

server = config_object['SETUP']['server']
database = config_object['SETUP']['database']
username = config_object['SETUP']['username']
password = config_object['SETUP']['password']
driver = config_object['SETUP']['driver']
port = config_object['SETUP']['port']


class DBOperations():

    def connection(self):
        connection = pyodbc.connect('DRIVER=' + driver + ';SERVER=' + server + ';PORT=' + port + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password)
        return connection

    def get_all_questions(self):
        questions = []
        query = '''
                SELECT q.QuestionID, q.QuestionText, t.AnswerID, t.Answer
                FROM dbo.questions q
                INNER JOIN dbo.answer_types t
                ON q.QuestionID = t.QuestionID
                '''

        conn = self.connection()
        cursor = conn.cursor()
        cursor.execute(query)
        columns = [desc[0] for desc in cursor.description]

        for row in cursor.fetchall():
            row_dict = dict(zip(columns, row))

            if not any(question["question_id"] == row_dict["QuestionID"] for question in questions):
                questions.append({
                                    "question_id": row_dict["QuestionID"],
                                    "question_text": row_dict["QuestionText"],
                                    "possible_answers": {}
                                })

            current_question = next(question for question in questions if question["question_id"] == row_dict["QuestionID"])
            current_question["possible_answers"][row_dict["AnswerID"]] = row_dict["Answer"]

        return questions

    def submit_form_answers(self, answer_ids):
        conn = self.connection()
        cursor = conn.cursor()
        timestamp = datetime.now()
        for answer_id in answer_ids:
            cursor.execute(("INSERT INTO dbo.answer_values(AnswerID, CreationTime) VALUES(?, ?);"), (answer_id, timestamp))
        conn.commit()
        conn.close()
