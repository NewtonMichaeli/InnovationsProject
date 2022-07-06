// Innovations request handler

const {ASSETS_FOLDER_PATH, ASSETS_FOLDER_NAME} = require('../../configs/_server')
const User = require('../../models/User')
// const User = require('../../models/User')
const fs = require('fs')


// Create (or add) a new innovation
const createInnovation = async (Username, data) => {

    const user = await User.findOne({Username})
    // check if an equaly named project already exists
    if (user.Innovations.findIndex(inv => inv.Name === data.Name) !== -1) return false

    // push new innovation
    user.Innovations.push(data)
    const result = await user.save()
    return result.Innovations[result.Innovations.length - 1] ?? false
}


// Update innovation data
const updateInnovation = async (Username ,project_id, data) => {

    const user = await User.findOne({Username})
    // find innovation index by id
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return {status: false, data: 'INCOMPLETE_FIELDS'}
    
    // check name (must be unique)
    if (data.Name && user.Innovations.findIndex(inv => inv.Name === data.Name) !== -1) return {status: false, data: 'INCOMPLETE_FIELDS'}
    
    // assign new properties to innovation
    Object.entries(data).map(prop => {
        if (data[prop[0]] !== undefined)
            user.Innovations[index][prop[0]] = prop[1]
    })

    // save new innovation
    const result = await user.save()
    return {
        status: result ? true : false, 
        data: result.Innovations[index]
    }
}


// Delete an existing innovation
const deleteInnovation = async (Username, project_id) => {
    
    const user = await User.findOne({Username})
    // find innovation index by id
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return {status: false, data: 'INV_NOT_FOUND'}

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
    return {status: result ? true : false}
}


// Upload asset and save asset-related data (path, etc)
const uploadAsset = async (Username, project_id, data) => {

    const user = await User.findOne({Username})
    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return false

    // insert file data to database
    user.Innovations[index].Assets.push({...data, path: data.path.replace(`${ASSETS_FOLDER_NAME}\\`, '')})
    const result = await user.save()
    return result ? true : false
}


// Upload asset and save asset-related data (path, etc)
const deleteAsset = async (Username, project_id, asset_id) => {

    const user = await User.findOne({Username})
    let deleted = false
    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return false

    // delete innovation asset
    user.Innovations[index].Assets = user.Innovations[index].Assets.filter(({path, _id}) => {
        // -- find and delete asset_id
        if (_id.toString() !== asset_id) return true
        try {
            deleted = true
            fs.unlinkSync(`${ASSETS_FOLDER_PATH}/${path}`)
            return false
        }
        catch(err) {
            return false
        }
    })

    // save results
    const result = await user.save()
    return result && deleted
}


module.exports = {createInnovation, uploadAsset, deleteInnovation, deleteAsset, updateInnovation}