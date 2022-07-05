const { ASSETS_FOLDER_PATH } = require('../configs/_server')
// handlers
const requestHandler = require('../utils/requests/innovations')
const responseHandler = require('../utils/responses/innovations')
// validations
const Joi_InnovationSchema = require('../validations/InnovationSchema')


// upload asset data to associated user
const uploadAsset = async (req, res) => {

    // extract req data
    const {user, innovationIndex, file} = req

    // validate path variables
    if (!file || !file?.path?.length || !file?.originalname?.length) return responseHandler.failedUploadingFile(res)

    // extract file data
    const { path, originalname } = file

    const result = await requestHandler.uploadAsset(user, innovationIndex, {path, originalName: originalname})
    if (result) responseHandler.fileUploadedSuccessfully(res)
    else responseHandler.incompleteFields(res)
}


// upload asset data to associated user
const sendAsset = async (req, res) => {

    // extract req data
    const {project_id, filename} = req.params, {user, innovationIndex: index} = req

    // validate filename
    if (!/^[a-z0-9]{32}$/.test(filename))
        return responseHandler.incompleteFields(res)

    // check if user's innovation stores the given asset filename
    if (user.Innovations[index].Assets.findIndex(a => a.path === filename) === -1) return responseHandler.fileNotfound(res)

    else responseHandler.fileFoundAndTransfered(res, `${ASSETS_FOLDER_PATH}/${filename}`)
}


// create a new innovation
const createInnovation = async (req, res) => {
    // extract requested innovation data
    const {Name, Description, Tags, Roles, Status, Private, Contributors} = req.body, {user} = req
    const InnovationData = {
        Name, Description, Tags, Roles, Status, Contributors, Private ,Assets: [], DoC: new Date().getTime()
    }

    // validate request data
    const {error} = Joi_InnovationSchema.validate(InnovationData)
    if (error) return responseHandler.incompleteFields(res)
    
    // create innovation
    const result = await requestHandler.createInnovation(user, InnovationData)
    if (result) responseHandler.innovationCreatedSuccessfully(res, result)
    else responseHandler.failedCreatingInnovation(res, InnovationData)
}


// delete an existing innovation
const deleteInnovation = async (req, res) => {

    const {project_id} = req.params, {user} = req

    // delete innovation
    const result = await requestHandler.deleteInnovation(user, project_id)

    if (result) responseHandler.innovationDeletedSuccessfully(res)
    else responseHandler.failedDeletingInnovation(res)
}


module.exports = {uploadAsset, createInnovation, deleteInnovation, sendAsset}