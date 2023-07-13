# comet
I have all the required services.
For live testing use 
# signup 
https://comet-test-sbai.onrender.com/api/signup
use a post request
body should have
name,email,password,role
![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/a85436e5-0b7c-40fe-8596-d173a4e9b33f)

# login
https://comet-test-sbai.onrender.com/api/login
use a post request
body should have
email, password
![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/1593e003-e327-469b-adc4-b3779b4752d8)


# Questions
https://comet-test-sbai.onrender.com/api/questions
get request you will get questions with the id

https://comet-test-sbai.onrender.com/api/questions
post 
body should have
name, question 
also token in header
Question will be saved in db as well sphere-engine with masterjudgeId:1001
![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/0faaf93d-7b01-4bcc-9afd-a96702063cad)

![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/4503f2b5-8dbf-445e-af2f-d6e9956e09b7)


https://comet-test-sbai.onrender.com/api/questions/edit/:id 
id of db not sphere-engine
PUT request
body should have
 question 
also token in header
![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/3623c03d-b7a7-4895-a7b6-beb20e9efd9a)

https://comet-test-sbai.onrender.com/api/questions/addtestcases/:id
patch
body should have 
testcases:[
{
input:---
output:---
},
{
input:---
output:---
}, ....
]
also token in header
![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/31752404-fa42-4e87-9782-6490a6831bd1)

https://comet-test-sbai.onrender.com/api/questions/delete/:id
id of db not sphere-engine
DELETE request
also token in header
![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/c2da6ddd-b60a-4fdf-8464-2c72f3a3c711)

# Submission

https://comet-test-sbai.onrender.com/api/submissions/:id 
id of db question
POST 
body should have source  Only C code 

![image](https://github.com/MuminAhmadKhan/comet/assets/63766734/8785850e-9fef-4789-aebe-8a91f5bc54a8)




#
