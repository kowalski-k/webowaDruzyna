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

    def get_all_table(self):
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT='+port+';DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM dbo.qna;")
        rows = cursor.fetchall()
        conn.close()
        return rows

    def add_answer(self, question, answer):
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT='+port+';DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        cursor.execute(("INSERT INTO dbo.qna VALUES(?, ?);"), (question, answer))
        conn.commit()
        conn.close()

    def delete_answer(self, question_id):
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT='+port+';DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        cursor.execute(("DELETE FROM dbo.qna WHERE QuestionID=?;"), question_id)
        conn.commit()
        conn.close()





example = DBOperations()
example.delete_answer(1)
print(example.get_all_table())