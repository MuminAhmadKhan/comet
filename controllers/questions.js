const fetch = require('node-fetch')
const questionRouter = require('express').Router()
const adminAuthorisation = require('../middlewares/adminAuthorisation')
const tokenAuthorisation = require('../middlewares/tokenAuthorisation')
const Question = require('../models/questions')
const {baseUrl,problemToken} = require('../utils/config')
const FormData = require('form-data');

questionRouter.get('/', async (req,res)=>
{
    try
    {
        const questions = await Question.find({})
        res.json(questions)
    }
    catch(error)
    {
        res.json(error)
    }
})

questionRouter.post('/', tokenAuthorisation, adminAuthorisation, async (req,res)=>
{
    const ques = req.body.question
    if(!ques) return res.status(400).json("Missing Information")
    const formdata = new FormData()
    formdata.append('name',req.body.name)
    formdata.append('body',ques)
    formdata.append('masterjudgeId',1001)
    try
    {

        
        const response = await fetch(baseUrl+'/problems?access_token='+problemToken, {
            method: 'POST',
            body: formdata
        })
        const data =  await response.json()
        const question = new Question({
            question:ques,
            sphereId:data.id
        })
        const savedQuestion = await question.save()
        res.json(savedQuestion)
    }
    catch(error)
    {
        res.status(400).json(error)
    }
})

questionRouter.put('/edit/:id',tokenAuthorisation, adminAuthorisation, async (req,res)=>
{
    if(!req?.params?.id) return res.json("Missing id")
    try
    {
        const ques = await Question.findById( req.params.id )
        ques.question = req.body.question
        const formdata = new FormData()
        formdata.append('body',req.body.question)
        const response = await fetch(baseUrl+`/problems/${ques.sphereId}?access_token=`+problemToken, {
            method: 'POST',
            body: formdata
        })
        const data =  await response.json()
        const editedQues = await ques.save()
        res.status(201).json(editedQues)
    }
    catch(error)
    {
        res.status(400).json(error)
    }

})

questionRouter.patch('/addtestcases/:id',tokenAuthorisation, adminAuthorisation, async (req,res)=>
{
    if(!req?.params?.id) return res.json("Missing id")
    try
    {
    const ques = await Question.findById( req.params.id )
    ques.testCases =  ques.testCases.concat(req.body.testcases)
    const editedQues = await ques.save()
 
    req.body.testcases.map(async(testcase) => {
        // console.log(testcase)
        const formdata = new FormData()
        formdata.append('input',testcase.input)
        formdata.append('output',testcase.output)
        formdata.append('judgeId',1)
        const response = await fetch(baseUrl+`/problems/${ques.sphereId}/testcases?access_token=`+problemToken, {
            method: 'POST',
            body: formdata
          })
        const data =  await response.json()
        console.log(data)
        }
        )

    res.status(201).json(editedQues)
    }
    catch(error)
    {
        res.status(400).json(error)
    }
})

questionRouter.delete('/delete/:id',tokenAuthorisation,adminAuthorisation, async (req,res)=>
{
    if(!req?.params?.id) return res.json("Missing id")
    try
    {
        const ques = await Question.findById(req.params.id)
        const response = await fetch(baseUrl+`/problems/${ques.sphereId}?access_token=`+problemToken, {
            method: 'DELETE',
        })
        const data =  await response.json()
        const deletedQues = await ques.deleteOne()

        res.status(201).json(deletedQues)
    }
    catch(error)
    {
        res.status(400).json(error)
    }
})

module.exports = questionRouter