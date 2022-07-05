// Innovations request handler

const User = require('../../models/User')

// Create (or add) a new innovation
const createInnovation = async (data, Username) => {
    const user = await User.findOne({Username})
    if (!user) return false
    
    user.Innovations.push(data)
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

module.exports = {createInnovation, uploadAsset}