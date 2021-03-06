// Auth request handler

const { MINIFIED_USER_SELECT_VALUES } = require('../../configs/_database')
const User = require('../../models/User')
const { ObjectId } = require('mongoose').Types


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
        if (result) {
            let occupiedFields = []
            if (checkOccupiedFields.Email === Email) occupiedFields.push('Email')
            if (checkOccupiedFields.Username === Username) occupiedFields.push('Username')
            return {status: false, data: {occupiedFields}}
        }
    }
    
    // assign new properties to invention
    Object.entries(data).map(prop => {
        if (user[prop[0]] !== undefined)
            user[prop[0]] = prop[1]
    })

    // save new invention
    const result = await user.save()
    return {
        status: result ? true : false, 
        data: result ?? undefined
    }
}

// Delete user
const deleteUser = async (Username) => {
    const result = await User.deleteOne({Username})
    return result?.deletedCount === 1 ? true : false
}

// Update user:following list
const updateFollowingList = async (Username, action, user_id) => {
    
    const user = await User.findOne({Username})

    // update src user
    if (action === 'remove') {
        // -- remove following
        if (!user.Following.includes(user_id))
            return {status: false, reason: 'NOT_FOLLOWING_USER'}
        user.Following = user.Following.filter(uid => uid !== user_id)
        const result = await user.save()
        if (!result) return {status: false}
    }
    else {
        // -- add following
        if (user.Following.includes(user_id))
            return {status: false, reason: 'ALREADY_FOLLOWING_USER'}
        user.Following.push(user_id)
        const result = await user.save()
        if (!result) return {status: false}
    }

    // determine action 
    action = (action === 'remove') ? '$pull' : '$push'

    // update dest user
    const result = await User
        .findByIdAndUpdate(user_id, {[action]: {Followers: user._id.toString()}})
        .select(MINIFIED_USER_SELECT_VALUES)
    
    return {status: result ? true : false, data: result}
}

// Search with query
const searchWithQuery = async (query, limit, excludeUsers) => {

    // search followings
    const regex = {$regex: new RegExp(query, 'i')}
    const result = await User
        .find({
            $or: [
                {Username: regex}, 
                {Email: regex}, 
                {Fname: regex}, 
                {Sname: regex}
            ],
            ...(excludeUsers.length && {$nor: excludeUsers.map(id => ({_id: ObjectId(id)}))})
        })
        .limit(limit)
        .select(MINIFIED_USER_SELECT_VALUES)
    
    return result
}


module.exports = {signup, updateUserData, deleteUser, updateFollowingList, searchWithQuery}