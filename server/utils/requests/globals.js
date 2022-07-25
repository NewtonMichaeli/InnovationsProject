// Global requests utility file

const User = require('../../models/User')
const Invention = require('../../models/Invention')
const {MINIFIED_USER_SELECT_VALUES} = require('../../configs/_database')
const {ObjectId} = require('mongoose').Types


/**
 * Gets a detailed user for every user_id in a given array
 * @param users (typeof user_id[])
 * @param fieldsToSelect (typeof {[key: string]: string})
 * @returns detailed user array (Username, Email, _id, etc)
 */
const _getDetailedUsersByArray = async (users, fieldsToSelect) => {

    if (!users?.length) return []
    const result = await User
    .find({ $or: users.map(user_id => ({_id: ObjectId(user_id)})) })
    .select(fieldsToSelect)

    return result.map(u => u._doc)
}


/**
 * @param user (typeof User)
 * @param isProtected (typeof boolean)
 * @returns detailed user (e.g Contributors full schema, shared_projects, etc)
 */
const getDetailedUser = async (user, isProtected) => {

    // initial states
    let Inventions = [], Shared_Projects = [], Followers = [], Following = []

    // Get detailed contributors data
    const user_inventions = await Invention.find( {Owner_id: user._id.toString()} )
    await Promise.all(user_inventions.map(async (inv, i) => {
        // -- push only if secure contributors array is not empty
        if (!inv.Private || !isProtected) {
            console.log('cont', inv.Contributors.map(c => c.user_id),)
            const updatedInvention = {
                ...inv._doc,
                Contributors: await _getDetailedUsersByArray(
                    inv.Contributors.map(c => c.user_id),
                    MINIFIED_USER_SELECT_VALUES
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
        const invention = await Invention.findById(sp.project_id)
        if (!invention) return

        // -- get detailed contributors
        let Contributors = await _getDetailedUsersByArray(
            invention.Contributors.map(c => c.user_id),
            MINIFIED_USER_SELECT_VALUES
        )

        // -- check privacy and push data to array
        if (!invention.Private || !isProtected)
            Shared_Projects.push({
                CreatorData: {
                    Username: user.Username,
                    _id: user._id.toString(),
                    Profile_Pic: user.Profile_Pic
                },
                Project: {
                    ...invention._doc,
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

const getDetailedInvention = async (Invention) => {

    const { Username, _id, Profile_Pic } = await User.findById(Invention.Owner_id)
    const Contributors = await _getDetailedUsersByArray(
        Invention.Contributors.map(c => c.user_id),
        MINIFIED_USER_SELECT_VALUES
    )
    return {
        Project: {...Invention, Contributors},
        CreatorData: {Username, _id, Profile_Pic}
    }
}


module.exports = {getDetailedUser, _getDetailedUsersByArray, getDetailedInvention}