// Assets request handler

const {ASSETS_FOLDER_PATH, ASSETS_FOLDER_NAME} = require('../../configs/_server')
const User = require('../../models/User')
const fs = require('fs')


// Upload asset and save asset-related data (path, etc)
const uploadAsset = async (Username, project_id, data) => {

    const user = await User.findOne({Username})
    // find associated invention index
    const index = user.Inventions.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return false

    // insert file data to database
    user.Inventions[index].Assets.push({...data, path: data.path.replace(`${ASSETS_FOLDER_NAME}\\`, '')})
    const result = await user.save()
    return result ? true : false
}


// Upload asset and save asset-related data (path, etc)
const deleteAsset = async (Username, project_id, asset_id) => {

    const user = await User.findOne({Username})
    let deleted = false
    // find associated invention index
    const index = user.Inventions.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return false

    // delete invention asset
    user.Inventions[index].Assets = user.Inventions[index].Assets.filter(({path, _id}) => {
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


module.exports = {deleteAsset, uploadAsset}