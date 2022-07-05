// Innovations request handler

const {ASSETS_FOLDER_PATH, ASSETS_FOLDER_NAME} = require('../../configs/_server')
// const User = require('../../models/User')
const fs = require('fs')


// Create (or add) a new innovation
const createInnovation = async (user, data) => {

    // check if an equaly named project already exists
    if (user.Innovations.findIndex(inv => inv.Name === data.Name) !== -1) return false

    // push new innovation
    user.Innovations.push(data)
    const result = await user.save()
    return result.Innovations[result.Innovations.length - 1] ?? false
}


// Delete an existing innovation
const deleteInnovation = async (user, project_id) => {
    
    // find innovation index by id
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return false

    // delete innovation assets
    user.Innovations[index].Assets.map(({path}) => {
        try {
            fs.unlinkSync(`${ASSETS_FOLDER_PATH}/${path}`)
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
    user.Innovations[index].Assets.push({...data, path: data.path.replace(`${ASSETS_FOLDER_NAME}\\`, '')})
    const result = await user.save()
    return result ? true : false
}


module.exports = {createInnovation, uploadAsset, deleteInnovation}