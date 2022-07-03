// Innovations request handler

const User = require('../../models/User')

// Create (or add) a new innovation
const createInnovation = async (data, user_id) => {
    const innovation = await User.updateOne(
        {_id: user_id},
        {$push: {Innovations: data}}
    )
    console.log('created instance: ', innovation)
}

// Upload asset and save asset-related data (path, etc)
const uploadAsset = async (data, user_id, project_id) => {
    const user = await User.findOne({_id: user_id})
    let index = user.Innovations.findIndex(inv => inv.id === project_id)

    if (index !== -1)
        user.Innovations[index].Assets.push(data)

    const result = await user.save()
    console.log('created instance: ', file)
}

module.exports = {createInnovation, uploadAsset}