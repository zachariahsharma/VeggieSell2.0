import mysql.connector

mydb = mysql.connector(host="localhost", user="root",
                       password="root1234", database="mydemodb")
mycursor = mydb.cursor()
sql = "select * from student"
mycursor.execute(sql)
myresult = mycursor.fetchall()
for x in myresult:
    print(x)
