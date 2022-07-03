// Auth controller
const jwt = require('jsonwebtoken')
const authRequests = require('../utils/requests/auth')
const responseHandler = require('../utils/responses/auth')
const {signinSchema, signupSchema} = require('../validations/AuthSchema')
const bcrypt = require('bcrypt')


// Sign up controller
const signup = async (req, res) => {

    console.log(req.body)
    if (!req.body) return responseHandler.incompleteFields(res) // -- check body first
    let {Email, Password, Username, Fname, Sname, IsAdmin} = req.body

    const {error} = signupSchema.validate(req.body)
    if (error) return responseHandler.incompleteFields(res)

    Role = req.isAdmin ? true : false           // -- determine target role
    Password = await bcrypt.hash(Password, 10)  // -- hash password

    // check if username or email are occupied
    const checkOccupiedFields = await authRequests.getUserByField({$or: [{Username}, {Email}]})
    console.log(checkOccupiedFields)
    if (checkOccupiedFields) {
        const emailOccupied = checkOccupiedFields.Email === Email
        const usernameOccupied = checkOccupiedFields.Username === Username
        return responseHandler.failedCreatingUser(res, {occupiedFields: {emailOccupied, usernameOccupied}})
    }

    // signing up
    const result = await authRequests.signup({Email, Password, Fname, Sname, Username, IsAdmin})
    if (!result) return responseHandler.failedCreatingUser(res, "Couldn't create user")

    // generating token
    const token = jwt.sign(JSON.stringify(result), process.env.TOKEN_SECRET)
    return responseHandler.userCreatedSuccessfully(res, token)
}

const signin = async (req, res) => {

}

module.exports = {signin, signup}