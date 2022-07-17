// Global requests file

const { CONTRIBUTOR_MINIFIED_VALUES_SELECT } = require('../../configs/_database')
const User = require('../../models/User')
const { ObjectId } = require('mongoose').Types


// Converts shared-projects default template to actual inventions list
const convertSharedProjects = async (user, protected) => {

    let Shared_Projects = []
    await Promise.all(user.Shared_Projects.map(async sp => {
        const user = await User.findById(sp.user_id)
        if (!user) return
        
        const result = user.Inventions.find(inv => inv._id.toString() === sp.project_id)
        // -- get detailed contributors
        const Contributors = await getContributorsDetails(result.Contributors, 'Fname Sname Username Email Profile_Pic _id Roles')

        if (!result.Private || !protected)
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
    return {...user._doc, Shared_Projects}
}


// Converts contributors default template to actual contributors list
// Input: contributors: user_id[]
// Output: contributors with more details (Username, Email, _id, Profile_Pic)
const getContributorsDetails = async (contributors, fieldsToSelect) => {

    const result = await User
    .find({ $or: contributors.map(({user_id}) => ({_id: ObjectId(user_id)})) })
    .select(CONTRIBUTOR_MINIFIED_VALUES_SELECT)

    return result.map(({_doc: c}, i) => ({...c, Roles: contributors[i].roles}))
}


// Converts contributors default template from all user-inventions to actual contributors list
// Input: user
// Output: user with (updated) detailed contributors
// * Method updates the passed user parameter, returning it's pointer
const convertContributorsForEveryInvention = async user => {

    let Inventions = []
    await Promise.all(user.Inventions.map(async (inv, i) => {
        if (inv.Contributors.length) {
            const updatedInvention = {
                ...inv._doc,
                Contributors: await getContributorsDetails(inv.Contributors, 'Fname Sname Username Email Profile_Pic _id Roles')
            }
            Inventions.push(updatedInvention)
        }
    }))

    return {
        ...user,
        Inventions
    }
}


// Converts followers/following arrays default templates to their detailed version
// Input: user
// Output: detailed array of followers/following users
// * Method updates the passed user parameter, returning it's pointer
const convertSocialData = async user => {

    const Followers = await User
    .find({ $or: user.Followers.map(({user_id}) => ({_id: ObjectId(user_id)})) })
    .select(CONTRIBUTOR_MINIFIED_VALUES_SELECT),
        Following = await User
    .find({ $or: user.Following.map(({user_id}) => ({_id: ObjectId(user_id)})) })
    .select(CONTRIBUTOR_MINIFIED_VALUES_SELECT)

    return result.map(({_doc: c}, i) => ({...c, Followers, Following}))
    return {
        Followers: Followers._doc,
        Following: Following._doc
    }
}


module.exports = {convertSharedProjects, getContributorsDetails, convertContributorsForEveryInvention, convertSocialData}