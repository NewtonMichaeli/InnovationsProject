// Auth request handler

const User = require('../../models/User')

// Signup a new account
const signup = async (data) => {

    const user = new User(data)
    user.save((err, newUser) => {
        if (err) return null
        console.log(newUser)
    })
    return true
}

// Get user by id
const getUserByField = async (statement) => {
    const result = await User.findOne(statement)
    return result
}


module.exports = {signup, getUserByField}