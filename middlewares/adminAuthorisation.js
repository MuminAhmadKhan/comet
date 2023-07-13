const adminAuthorisation = (request, response, next) =>{
    console.log(request.role.toLowerCase())
    if(request.role.toLowerCase() === 'admin')
        next()              // for more security we can also query from database whether user has role admin
    else response.status(401).json("You don't have access")

}

module.exports = adminAuthorisation