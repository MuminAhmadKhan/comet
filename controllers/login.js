const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    if(request.body.email && request.body.password)
    {
        const { email, password } = request.body
    
        try{

            const user = await User.findOne({ email })
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(password, user.password)

            if (!(user && passwordCorrect)) {
                return response.status(401).json({
                error: 'invalid username or password'
                })
            }

            const userForToken = {
                email: user.email,
                id: user._id,
                role: user.role
            }

            const token = jwt.sign(userForToken, process.env.SECRET,{ expiresIn: '24h' })

            response.status(200).send({ token, email: user.email })
        }
        catch(error)
        {
            response.status.apply(400).json(error)
        }
    }
    else response.json("Missing credentials")
})

module.exports = loginRouter