// Auth request handler

const User = require('../../models/User')

// Signup a new account (returns the new user)
const signup = async (data) => {

    const user = new User(data)
    const result = await user.save()
    return result
}

// Get user by id
const getUserByField = async (statement) => {
    const result = await User.findOne(statement)
    return result
}

// Update user data
const updateUserData = async (user, data) => {
    
    // check username and email (must be unique)
    if (data.Username || data.Email) {
        const result = await getUserByField({$or: [
            {Email: data?.Email}, 
            {Username: data?.Username}
        ]})
        if (result) return {status: false, data: 'INCOMPLETE_FIELDS'}
    }
    
    // assign new properties to innovation
    Object.entries(data).map(prop => {
        console.log(prop[0] + ':', prop[1])
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
const deleteUser = async (Username, Email) => {
    const result = await User.deleteOne({Username, Email})
    return result?.deletedCount === 1 ? true : false
}


module.exports = {signup, getUserByField, updateUserData, deleteUser}