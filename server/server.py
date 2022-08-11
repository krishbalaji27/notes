#from urllib import request
import mysql.connector
from flask import Flask,request

app = Flask(__name__)
db = mysql.connector.connect(
    host = "localhost",
    user = "balaji",
    passwd = "balaji",
    database = "notes"
)
mycursor = db.cursor(buffered=True)

@app.route("/api/signup",methods=['POST'])
def signup():
    print("hi")
    #print(request.form)
    print(request.get_json())
    b = request.get_json()
    print(type(b))
    name = b.get("name")
    mailId = b.get("mail")
    password = b.get("password")
    profession = b.get("profession")
    mycursor.execute("select password from user_details where mail= %s", (mailId,))
    user=mycursor.fetchone()
    if user:
        return {"result":"user already exists"}

    mycursor.execute('insert into user_details values (%s,%s,%s,%s,NULL)', (name,mailId,password,profession))
    db.commit()
    print(request.data)
    return {"result":"Success"}

@app.route("/api/login",methods=['POST'])
def login():
    print(request.get_json())
    b = request.get_json()
    print(type(b))
    checkPass = b.get("pass")
    logMail = b.get("mailId")
    mycursor.execute("select * from user_details where mail= %s", (logMail,))
    mailDb=mycursor.fetchone()
    print(mailDb)
    print(type(mailDb))
    print("checking pass",checkPass)
    if not mailDb:
        return {"result":"You entered wrong email Id"}
    elif checkPass == mailDb[2]:
        return {"result":"Password Success", "userId" : mailDb[4], "name": mailDb[0]}
    else:
        return {"result":" You entered wrong Password"}

if __name__=="__main__":
    app.run(debug=True)