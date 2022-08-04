// Global requests utility file

const User = require('../../models/User')
const Invention = require('../../models/Invention')
const {MINIFIED_USER_SELECT_VALUES} = require('../../configs/_database')
const {ObjectId} = require('mongoose').Types


/**
 * Gets a detailed contributor
 * @param users (typeof {user_id, roles}[])
 * @param fieldsToSelect (typeof {[key: string]: string})
 * @returns detailed contributors array (with Roles)
 */
const _getDetailedContributorsByArray = async (users, fieldsToSelect) => {

    if (!users?.length) return []
    const result = await User
        .find({ $or: users.map(c => ({_id: ObjectId(c.user_id)})) })
        .select(fieldsToSelect)

    return result.map(u => ({
        ...u._doc,
        Roles: users.find(({user_id}) => user_id === u._doc._id.toString())?.roles ?? []
    }))
}


/**
 * Gets a detailed user for every asset uploader in a given array
 * @param users (typeof user_id[])
 * @param fieldsToSelect (typeof {[key: string]: string})
 * @returns detailed user array (Username, Email, _id, etc)
 */

const _getDetailedAssetUploadersByArray = async (users, fieldsToSelect) => {
    if (!users?.length) return []
    const result = await User
        .find({ $or: users.map(({src}) => ({_id: ObjectId(src)})) })
        .select(fieldsToSelect)

    return users.map(u => ({
        ...u._doc,
        src: result.find(user => user._id.toString() === u.src)
    }))
}

    
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
const getDetailedUser = async (user, isProtected, req_user_id) => {

    // initial states
    let Inventions = [], Shared_Projects = [], Followers = [], Following = []

    // Get detailed contributors data
    const user_inventions = await Invention.find( {Owner_id: user._id.toString()} )
    await Promise.all(user_inventions.map(async (inv, i) => {
        // -- push only if secure
        if (!inv.Private || !isProtected) {
            const updatedInvention = {
                ...inv._doc,
                Contributors: await _getDetailedContributorsByArray(inv.Contributors, MINIFIED_USER_SELECT_VALUES),
                Assets: await _getDetailedAssetUploadersByArray(inv.Assets, MINIFIED_USER_SELECT_VALUES)
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
        let Contributors = await _getDetailedContributorsByArray(invention.Contributors, MINIFIED_USER_SELECT_VALUES)
        let Assets = await _getDetailedAssetUploadersByArray(invention.Assets, MINIFIED_USER_SELECT_VALUES)

        // -- check privacy and push data to array
        if (!invention.Private || !isProtected || req_user_id === user._id.toString()) {
            Shared_Projects.push({
                CreatorData: {
                    Username: user.Username,
                    _id: user._id.toString(),
                    Profile_Pic: user.Profile_Pic
                },
                Project: {
                    ...invention._doc,
                    Contributors,
                    Assets
                }
            })
        }
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
    const Contributors = await _getDetailedContributorsByArray(Invention.Contributors, MINIFIED_USER_SELECT_VALUES)
    const Assets = await _getDetailedAssetUploadersByArray(Invention.Assets, MINIFIED_USER_SELECT_VALUES)

    return {
        Project: {...Invention, Contributors, Assets},
        CreatorData: {Username, _id, Profile_Pic}
    }
}


module.exports = {getDetailedUser, _getDetailedUsersByArray, getDetailedInvention, _getDetailedAssetUploadersByArray}