require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = '3003' || process.env.PORT
const baseUrl = process.env.BASE_SPHERE_URI
const problemToken = process.env.PROBLEM_TOKEN
module.exports = {
    MONGODB_URI,
    PORT,
    baseUrl,
    problemToken
}