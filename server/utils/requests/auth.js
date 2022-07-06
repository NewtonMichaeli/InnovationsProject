// Auth request handler

const User = require('../../models/User')

// Signup a new account (returns the new user)
const signup = async (data) => {

    const {Email, Username} = data
    // check if username or email are occupied
    const checkOccupiedFields = await User.findOne({$or: [{Username}, {Email}]})
    if (checkOccupiedFields) {
        let occupiedFields = []
        if (checkOccupiedFields.Email === Email) occupiedFields.push('Email')
        if (checkOccupiedFields.Username === Username) occupiedFields.push('Username')
        return {status: false, data: {occupiedFields}}
    }

    // create user
    const user = await new User(data).save()
    return {status: user ? true : false, data: user}
}

// Update user data
const updateUserData = async (Username, data) => {
    
    const user = await User.findOne({Username})
    // check username and email (must be unique)
    if (data.Username || data.Email) {
        const result = await User.findOne({$or: [
            {Email: data?.Email}, 
            {Username: data?.Username}
        ]})
        if (result) return {status: false, data: 'INCOMPLETE_FIELDS'}
    }
    
    // assign new properties to innovation
    Object.entries(data).map(prop => {
        if (user[prop[0]] !== undefined)
            user[prop[0]] = prop[1]
    })

    // save new innovation
    const result = await user.save()
    return {
        status: result ? true : false, 
        data: result
    }
}

// Delete user
const deleteUser = async (Username) => {
    const result = await User.deleteOne({Username})
    return result?.deletedCount === 1 ? true : false
}


module.exports = {signup, updateUserData, deleteUser}