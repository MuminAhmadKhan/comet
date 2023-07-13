const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
userRouter = require('express').Router()
userRouter.post('/', async (request, response) => {
    
    const {name,email,password,role} = request.body
    if(name && email && password && role)
    {
     try{   
        
        const dupUser = await User.findOne({email})
        if (name.length<3 || password.length < 3 || dupUser ){
            return response.status(400).send("Nothing")

        }
        const saltRounds = 10
        const passHash = await bcrypt.hash(password , saltRounds)
        const user = new User({
            name,
            email,
            password:passHash,
            role
        })
        const savedUser = await user.save()
        
    const userForToken = {
        email: savedUser.email,
        id: savedUser._id,
        role: role
    }

    const token = jwt.sign(userForToken, process.env.SECRET,{ expiresIn: '24h' })

    return response.status(200).send({ token, email: user.email })
}
    catch(error)
    {
        response.status(400).json(error)
    }
     }
else response.json("Missing credentials")
})


  module.exports = userRouter