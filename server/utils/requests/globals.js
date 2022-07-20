// Global requests utility file

const User = require('../../models/User')
const {MINIFIED_USER_SELECT_VALUES} = require('../../configs/_database')
const {ObjectId} = require('mongoose').Types


// Gets a detailed user for every user_id in a given array
// Input: user_id[]
// Output: detailed user array (Username, Email, _id, etc)
const _getDetailedUsersByArray = async (users, fieldsToSelect) => {

    const result = await User
    .find({ $or: users.map(user_id => ({_id: ObjectId(user_id)})) })
    .select(fieldsToSelect)

    return result.map(u => u._doc)
}


// Gets detailed user fields (e.g Contributors full schema, shared_projects, etc)
const getDetailedUser = async (user, isProtected) => {

    // initial states
    let Inventions = [], Shared_Projects = [], Followers = [], Following = []

    // Get detailed contributors data
    await Promise.all(user.Inventions.map(async (inv, i) => {
        // -- push only if secure contributors array is not empty
        if ((!inv.Private || !isProtected) && inv.Contributors.length) {
            const updatedInvention = {
                ...inv._doc,
                Contributors: await _getDetailedUsersByArray(
                    inv.Contributors.map(c => c.user_id),
                    'Fname Sname Username Email Profile_Pic _id'
                )
            }
            Inventions.push(updatedInvention)
        }
    }))

    // Get detailed shared_projects
    await Promise.all(user.Shared_Projects.map(async sp => {
        // -- find project owner
        const user = await User.findById(sp.user_id)
        if (!user) return
        // -- find shared invention
        const result = user.Inventions.find(inv => inv._id.toString() === sp.project_id)
        // -- get detailed contributors
        let Contributors = []
        if (result.Contributors.length) Contributors = await _getDetailedUsersByArray(
            result.Contributors.map(c => c.user_id),
            'Fname Sname Username Email Profile_Pic _id Roles'
        )
        // -- check privacy and push data to array
        if (!result.Private || !isProtected)
            Shared_Projects.push({
                CreatorData: {
                    Username: user.Username,
                    _id: user._id.toString(),
                    Profile_Pic: user.Profile_Pic
                },
                Project: {
                    ...result._doc,
                    Contributors
                }
            })
    }))
    
    // Get detailed follower/following lists
    // -- get users from followers array
    if (user.Followers.length) Followers = await User
        .find({ $or: user.Followers.map(user_id => ({_id: ObjectId(user_id)})) })
        .select(MINIFIED_USER_SELECT_VALUES)
    // -- get users from following array
    if (user.Following.length) Following = await User
        .find({ $or: user.Following.map(user_id => ({_id: ObjectId(user_id)})) })
        .select(MINIFIED_USER_SELECT_VALUES)

    // return user with updated (fully-detailed) values
    return {
        ...user._doc,
        Password: undefined,    // password is redundant
        Inventions,
        Shared_Projects,
        Followers,
        Following
    }
}

module.exports = {getDetailedUser, _getDetailedUsersByArray}