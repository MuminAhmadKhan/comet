const jwt = require('jsonwebtoken')
const tokenAuthorisation = (request, response, next) =>{
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token =  authorization.substring(7)     
        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log(decodedToken.role)
        if (decodedToken){
        request.email = decodedToken.email
        request.id = decodedToken.id
        request.role = decodedToken.role
        next()
        }
        else 
        response.status(400).json("Invalid Token")
    }
    else response.status(400).json("Missing Token")

}

module.exports = tokenAuthorisation