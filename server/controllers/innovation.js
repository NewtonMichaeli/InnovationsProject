const Joi = require('@hapi/joi')
// handlers
const requestHandler = require('../utils/requests/innovations')
const responseHandler = require('../utils/responses/innovations')
// validations
const Joi_InnovationSchema = require('../validations/InnovationSchema')


// upload asset data to associated user
const upload = async (req, res) => {

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


// create a new innovation
const createInnovation = async (req, res) => {
    const {username} = req.params, {Name, Description, Tags, Roles, Status, Contributors} = req.body
    const InnovationData = {
        Name, Description, Tags, Roles, Status, Contributors, Assets: [], DoC: new Date().getTime()
    }

    // validate request data
    const {error} = Joi_InnovationSchema.validate(InnovationData)
    if (error) return responseHandler.incompleteFields(res)
    
    // create innovation
    const result = await requestHandler.createInnovation(InnovationData, username)
    if (result) responseHandler.innovationCreatedSuccessfully(res, result)
    else responseHandler.failedCreatingInnovation(res, InnovationData)
}


// delete an existing innovation
const deleteInnovation = async (req, res) => {
    const {username, project_id} = req.params

    // delete innovation
    const result = await requestHandler.deleteInnovation(username, project_id)
    if (result) responseHandler.innovationDeletedSuccessfully(res)
    else responseHandler.failedDeletingInnovation(res)
}


module.exports = {upload, createInnovation, deleteInnovation}