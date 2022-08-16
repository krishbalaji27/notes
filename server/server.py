#from urllib import request
from unittest import result
import mysql.connector
from flask import Flask,request
import json

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
    #print(request.data)
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



def util(inputDict,currentKey,nameDict):
    result= dict()
    result["id"] = currentKey
    result["name"] = nameDict[currentKey]
    if currentKey in inputDict: # and len(inputDict[currentKey])> 0:
        result["children"]=list()
        for i in  inputDict[currentKey]:
            ans = util(inputDict,i,nameDict )
            result["children"].append(ans)
    print(result)
    return result


@app.route("/api/details",methods=['POST','GET'])
def details():
    mycursor.execute("select * from topics")
    topics = mycursor.fetchall()
    a = dict()
    b = dict()
    for i in topics:
        print(i)
        b[i[0]] = i[1]
        if(i[2] in a):
            a[i[2]].append(i[0])
        else:
            a[i[2]]=[i[0]]
    for i in a:
        print(i,a[i])
    # ToDo remove hard code
    result= util(a,1,b)
    return {"result":json.dumps(result)}
@app.route("/api/select",methods=['POST','GET'])
def select():
    a=request.get_json()
    getId = a.get("Id")
    mycursor.execute("select category,value from content where topicId=%s",(getId,))
    value = mycursor.fetchall()
    return {"ShowValue":value   }
if __name__=="__main__":
    app.run(debug=True)