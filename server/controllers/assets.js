const { ASSETS_FOLDER_PATH } = require('../configs/_server')
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

    const result = await requestHandler.uploadAsset(user.Username, project_id, {path, originalName: originalname})
    if (result) responseHandler.fileUploadedSuccessfully(res)
    else responseHandler.failedUploadingFile(res)
}

// upload asset data to associated user
const deleteAsset = async (req, res) => {

    // extract req data
    const { user } = req, { project_id, asset_id } = req.params

    const result = await requestHandler.deleteAsset(user.Username, project_id, asset_id)
    if (result) responseHandler.fileDeletedSuccessfully(res)
    else responseHandler.fileNotfound(res)
}

// upload asset data to associated user
const sendAsset = async (req, res) => {

    // extract req data
    const {project_id, filename} = req.params, {user} = req

    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return responseHandler.innovationNotFound(res)

    // validate filename
    if (!/^[0-9.a-zA-Z]+$/.test(filename))
        return responseHandler.fileNotfound(res)

    // check if user's innovation stores the given asset filename
    if (user.Innovations[index].Assets.findIndex(a => a.path === filename) === -1) return responseHandler.fileNotfound(res)
    else responseHandler.fileFoundAndTransfered(res, `${ASSETS_FOLDER_PATH}/${filename}`)
}


module.exports = {deleteAsset, sendAsset, uploadAsset}