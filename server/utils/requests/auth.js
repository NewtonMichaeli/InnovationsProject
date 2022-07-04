// Auth request handler

const User = require('../../models/User')

// Signup a new account (returns the new user)
const signup = async (data) => {

    const user = new User(data)
    const result = await user.save()
    console.log('aftermath', result)
    return result
}

// Get user by id
const getUserByField = async (statement) => {
    const result = await User.findOne(statement)
    return result
}


module.exports = {signup, getUserByField}