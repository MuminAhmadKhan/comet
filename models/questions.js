const mongoose = require('mongoose')
questionSchema = new mongoose.Schema({
    
  question: {
    type:String,
    required:true,
    minlength:3,
    },
  testCases: [{
    input:{
        type:String,
    },
    output:{
        type:String
    }
  }],
  sphereId:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Question',questionSchema)