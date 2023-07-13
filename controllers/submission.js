const fetch = require('node-fetch')
const submissionRouter = require('express').Router()
const tokenAuthorisation = require('../middlewares/tokenAuthorisation')
const {baseUrl,problemToken} = require('../utils/config')
const Question = require('../models/questions')

const FormData = require('form-data');

submissionRouter.post('/:id',tokenAuthorisation,async (req,res)=>
{
  if(!req?.params?.id) return res.json("Missing id")
try
{
    const ques = await Question.findById( req.params.id )
    const formdata = new FormData()
    formdata.append('problemId',ques.sphereId)
    formdata.append('source',req.body.source)
    formdata.append('compilerId',11)  //only c
    console.log(baseUrl+'/problem?access_token='+problemToken)
    const response = await fetch(baseUrl+'/submissions?access_token='+problemToken, {
        method: 'POST',
        body: formdata
      })
    const data =  await response.json()
    setTimeout(async () => {
        const response = await fetch(baseUrl+`/submissions/${data.id}?access_token=`+problemToken, {
            method: 'GET',
          })
        const result = await response.json()   //would use webhooks ideally
        res.json(result)
    }, 2000);
  }
  catch(error)
  {
      res.status(400).json(error)
  }
})

module.exports = submissionRouter