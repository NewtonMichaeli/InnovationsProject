const { ASSETS_FOLDER_PATH } = require('../configs/_server')
const Invention = require('../models/Invention')
// handlers
const requestHandler = require('../utils/requests/assets')
const responseHandler = require('../utils/responses')


// upload asset data to associated user
const uploadAsset = async (req, res) => {

    // extract req data
    const { user, file } = req, { project_id } = req.params

    // validate path variables
    if (!file || !file?.path?.length || !file?.originalname?.length) return responseHandler.failedUploadingFile(res)

    // extract file data
    const { path, originalname } = file

    const result = await requestHandler.uploadAsset(project_id, {path, originalName: originalname})
    if (result) responseHandler.fileUploadedSuccessfully(res)
    else responseHandler.failedUploadingFile(res)
}

// upload asset data to associated user
const deleteAsset = async (req, res) => {

    // extract req data
    const { user } = req, { project_id, asset_id } = req.params

    const result = await requestHandler.deleteAsset(project_id, asset_id)
    if (result) responseHandler.fileDeletedSuccessfully(res)
    else responseHandler.fileNotfound(res)
}

// upload asset data to associated user
const sendAsset = async (req, res) => {

    // extract req data
    const {project_id, filename} = req.params, {user} = req

    // find associated invention
    const invention = await Invention.findById(project_id)
    if (!invention) return responseHandler.inventionNotFound(res)

    // validate filename
    if (!/^[0-9.a-zA-Z]+$/.test(filename))
        return responseHandler.fileNotfound(res)

    // check if user's invention stores the given asset filename
    if (invention.Assets.findIndex(a => a.path === filename) === -1) return responseHandler.fileNotfound(res)
    else responseHandler.fileFoundAndTransfered(res, `${ASSETS_FOLDER_PATH}/${filename}`)
}


module.exports = {deleteAsset, sendAsset, uploadAsset}