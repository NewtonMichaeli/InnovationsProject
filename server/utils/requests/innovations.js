// Innovations request handler

const User = require('../../models/User')
const fs = require('fs')

// Create (or add) a new innovation
const createInnovation = async (data, Username) => {

    const user = await User.findOne({Username})
    if (!user) return false
    
    // push new innovation
    user.Innovations.push(data)
    const result = await user.save()
    return result.Innovations[result.Innovations.length - 1] ?? false
}

// Delete an existing innovation
const deleteInnovation = async (Username, project_id) => {
    
    const user = await User.findOne({Username})
    if (!user) return false
    
    // find innovation index by id
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return false

    // delete innovation assets
    user.Innovations[index].Assets.map(({path}) => {
        try {
            fs.unlinkSync(`${__dirname}/../../${path}`)
        }
        catch(err) {
            if (err?.code !== 'ENOENT') return false
        }
    })

    // delete innovation
    user.Innovations = user.Innovations.filter(inv => inv._id.toString() !== project_id)
    const result = await user.save()
    return result ? true : false
}

// Upload asset and save asset-related data (path, etc)
const uploadAsset = async (user, index, data) => {

    // insert file data to database
    user.Innovations[index].Assets.push(data)
    const result = await user.save()
    return result ? true : false
}

module.exports = {createInnovation, uploadAsset, deleteInnovation}