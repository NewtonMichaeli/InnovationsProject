// Auth controller
const jwt = require('jsonwebtoken')
const authRequests = require('../utils/requests/auth')
const responseHandler = require('../utils/responses/auth')
const {Joi_SigninSchema, Joi_SignupSchema, Joi_UpdatingUserDataSchema} = require('../validations/AuthSchema')
const bcrypt = require('bcrypt')


// Extract relevant fields and generate token
const signNewUserToken = ({Username, Email, IsAdmin}) => jwt.sign(
    JSON.stringify({Email, Username, IsAdmin}),
    process.env.TOKEN_SECRET
)


// Sign up controller
const signup = async (req, res) => {

    if (!req.body) return responseHandler.incompleteFields(res) // -- check body first
    let {Email, Password, Username, Fname, Sname, IsAdmin} = req.body

    const {error} = Joi_SignupSchema.validate(req.body)
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
    const token = signNewUserToken(result)
    return responseHandler.userCreatedSuccessfully(res, token)
}


// Sign in controller
const signin = async (req, res) => {

    if (!req.body) return responseHandler.incompleteFields(res) // -- check body first
    let {Username, Password} = req.body

    // vaildate fields
    const {error} = Joi_SigninSchema.validate(req.body)
    if (error) return responseHandler.incompleteFields(res)
    
    // search db for existing account
    const result = await authRequests.getUserByField({Username})
    if (!result) return responseHandler.incorrectCredentials(res)
    
    // compare hashed passwords
    const match = await bcrypt.compare(Password, result.Password)
    if (!match) return responseHandler.incorrectCredentials(res)

    // generate token
    const token = signNewUserToken(result)
    return responseHandler.loggedInSuccessfully(res, token)
}


// Get user data
const getUserData = async (req, res) => {
    return responseHandler.userSentSuccessfully(res, req.user)
}


// Update user data
const updateUserData = async (req, res) => {
    
    // update non-empty data
    if (!req.body || !Object.keys(req.body).length) return responseHandler.incompleteFields(res)
    // extract data from request body
    const new_data = req.body, {user} = req
    console.log('user: ', user)

    // verify request data
    const {error} = Joi_UpdatingUserDataSchema.validate(new_data)
    if (error) return responseHandler.incompleteFields(res)

    // update data
    const result = await authRequests.updateUserData(user, new_data)
    if (result.status) {
        // -- generate new token and send it along with thenew data
        const new_token = signNewUserToken(result.data)
        return responseHandler.userUpdatedSuccessfully(res, result.data, new_token)
    }
    else if (result.data === 'INCOMPLETE_FIELDS') return responseHandler.incompleteFields(res)
    else return responseHandler.failedUpdatingUser(res)

}


// Update user data
const deleteUser = async (req, res) => {
    
    const {user} = req
    // delete user
    const result = await authRequests.deleteUser(user.Username, user.Email)
    if (result) return responseHandler.userDeletedSuccessfully(res)
    else responseHandler.failedDeletingUser(res)
}


module.exports = {signin, signup, getUserData, updateUserData, deleteUser}