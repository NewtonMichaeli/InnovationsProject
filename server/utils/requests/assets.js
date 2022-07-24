// Assets request handler

const {ASSETS_FOLDER_PATH, ASSETS_FOLDER_NAME} = require('../../configs/_server')
const User = require('../../models/User')
const Invention = require('../../models/Invention')
const fs = require('fs')


// Upload asset and save asset-related data (path, etc)
const uploadAsset = async (project_id, data) => {

    // find associated invention
    const invention = await Invention.findById(project_id)
    if (!invention) return false

    // insert file data to database
    invention.Assets.push({...data, path: data.path.replace(`${ASSETS_FOLDER_NAME}\\`, '')})
    const result = await invention.save()
    return result ? true : false
}


// Upload asset and save asset-related data (path, etc)
const deleteAsset = async (project_id, asset_id) => {

    let deleted = false

    // find associated invention
    const invention = await Invention.findById(project_id)
    if (!invention) return false

    // delete invention asset
    invention.Assets = invention.Assets.filter(({path, _id}) => {
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
    const result = await invention.save()
    return result && deleted
}


module.exports = {deleteAsset, uploadAsset}