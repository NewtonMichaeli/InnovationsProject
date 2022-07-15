// Global requests file

const User = require('../../models/User')


// Converts shared-projects default template to actual inventions list
const convertSharedProjects = async (user, protected) => {

    let Shared_Projects = []
    await Promise.all(user.Shared_Projects.map(async sp => {
        const user = await User.findById(sp.user_id)
        if (!user) return
        const result = user.Inventions.find(inv => inv._id.toString() === sp.project_id)
        if (!result.Private || !protected)
            Shared_Projects.push({
                CreatorData: {
                    Username: user.Username,
                    _id: user._id.toString(),
                    Profile_Pic: user.Profile_Pic
                },
                Project: result
            })
    }))
    return {...user._doc, Shared_Projects}
}


module.exports = {convertSharedProjects}