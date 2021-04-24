import pyodbc
from configparser import ConfigParser


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
        conn = self.connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM dbo.questions;")
        table = cursor.fetchall()
        conn.close()
        return table

    def get_answer_types(self, question_id):
        conn = self.connection()
        cursor = conn.cursor()
        cursor.execute(("SELECT AnswerID, Answer FROM dbo.answer_types WHERE QuestionID = ?;"), question_id)
        table = cursor.fetchall()
        conn.close()
        return table

    def add_answer(self, answer_id, timestamp):
        conn = self.connection()
        cursor = conn.cursor()
        cursor.execute(("INSERT INTO dbo.answer_values(AnswerID, CreationTime) VALUES(?, ?);"), (answer_id, timestamp))
        conn.commit()
        conn.close()
