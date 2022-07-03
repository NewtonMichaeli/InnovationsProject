const Joi = require('@hapi/joi')
// handlers
const requestHandler = require('../utils/requests/innovations')
const responseHandler = require('../utils/responses/innovations')
// validations
const Joi_InnovationSchema = require('../validations/InnovationSchema')


// upload asset data to associated user
const upload = async (req, res) => {
    console.log(req.file)
    const {user_id, project_id} = req.params, fileData = {
        path: req.file?.path,
        originalName: req.file?.originalname
    }

    if (!fileData.path?.length || !fileData.originalName?.length || !user_id?.length || !project_id?.length)
        return responseHandler.incompleteFields(res)

    const result = requestHandler.uploadAsset(fileData, user_id, project_id)

    if (result) responseHandler.fileUploadedSuccessfully(res)
    else responseHandler.failedUploadingFile(res)
}


// create a new innovation
const createInnovation = async (req, res) => {
    const {user_id} = req.params, {Name, Description, Tags, Roles, Status, Contributers} = req.body
    const InnovationData = {
        Name, Description, Tags, Roles, Status, Contributers, Assets: [], DoC: new Date().getTime()
    }

    if (Joi_InnovationSchema.validate(InnovationData) === false)
        return responseHandler.incompleteFields(res)
    
    const result = requestHandler.createInnovation(InnovationData, user_id)

    if (result) responseHandler.innovationCreatedSuccessfully(res, InnovationData)
    else responseHandler.failedCreatingInnovation(res, InnovationData)
}


module.exports = {upload, createInnovation}