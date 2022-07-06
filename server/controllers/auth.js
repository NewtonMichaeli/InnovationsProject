// Auth controller
const jwt = require('jsonwebtoken')
const authRequests = require('../utils/requests/auth')
const responseHandler = require('../utils/responses/auth')
const {signinSchema, signupSchema} = require('../validations/AuthSchema')
const bcrypt = require('bcrypt')


// Sign up controller
const signup = async (req, res) => {

    if (!req.body) return responseHandler.incompleteFields(res) // -- check body first
    let {Email, Password, Username, Fname, Sname, IsAdmin} = req.body

    const {error} = signupSchema.validate(req.body)
    if (error) return responseHandler.incompleteFields(res)

    Role = req.IsAdmin ? true : false           // -- determine target role
    Password = await bcrypt.hash(Password, 10)  // -- hash password

    // check if username or email are occupied
    const checkOccupiedFields = await authRequests.getUserByField({$or: [{Username}, {Email}]})
    if (checkOccupiedFields) {
        let occupiedFields = []
        if (checkOccupiedFields.Email === Email) occupiedFields.push('Email')
        if (checkOccupiedFields.Username === Username) occupiedFields.push('Username')
        return responseHandler.failedCreatingUser(res, {occupiedFields})
    }

    // signing up
    const result = await authRequests.signup({Email, Password, Fname, Sname, Username, IsAdmin})
    if (!result) return responseHandler.failedCreatingUser(res)

    // generating token
    const token = jwt.sign(JSON.stringify(result), process.env.TOKEN_SECRET)
    return responseHandler.userCreatedSuccessfully(res, token)
}


// Sign in controller
const signin = async (req, res) => {

    if (!req.body) return responseHandler.incompleteFields(res) // -- check body first
    let {Username, Password} = req.body

    // vaildate fields
    const {error} = signinSchema.validate(req.body)
    if (error) return responseHandler.incompleteFields(res)
    
    // search db for existing account
    const result = await authRequests.getUserByField({Username})
    if (!result) return responseHandler.incorrectCredentials(res)
    
    // compare hashed passwords
    const match = await bcrypt.compare(Password, result.Password)
    if (!match) return responseHandler.incorrectCredentials(res)

    // generate token
    const token = jwt.sign(JSON.stringify(result), process.env.TOKEN_SECRET)
    return responseHandler.loggedInSuccessfully(res, token)
}


// Get user data
const getUserData = async (req, res) => {
    return responseHandler.userSentSuccessfully(res, req.user)
}


// Update user data
const updateUserData = async (req, res) => {
    
}


module.exports = {signin, signup, getUserData, updateUserData}