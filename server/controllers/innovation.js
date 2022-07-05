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
    const {username} = req.params, {Name, Description, Tags, Roles, Status, Contributors, Assets} = req.body
    const InnovationData = {
        Name, Description, Tags, Roles, Status, Contributors, Assets, DoC: new Date().getTime()
    }

    const {error} = Joi_InnovationSchema.validate(InnovationData)
    if (error) return responseHandler.incompleteFields(res)
    
    const result = await requestHandler.createInnovation(InnovationData, username)

    if (result) responseHandler.innovationCreatedSuccessfully(res, InnovationData)
    else responseHandler.failedCreatingInnovation(res, InnovationData)
}


module.exports = {upload, createInnovation}