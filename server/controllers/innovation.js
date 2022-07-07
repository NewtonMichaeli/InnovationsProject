const { ASSETS_FOLDER_PATH, PRIVILEGES } = require('../configs/_server')
// handlers
const requestHandler = require('../utils/requests/innovations')
const innovationResponseHandler = require('../utils/responses/innovations')
const authResponseHandler = require('../utils/responses/auth')
// validations
const {Joi_InnovationSchema, Joi_InnovationSchema_UpdatingData__creator, Joi_InnovationSchema_UpdatingData__contributor} = require('../validations/InnovationSchema')


// upload asset data to associated user
const uploadAsset = async (req, res) => {

    // extract req data
    const { user, file } = req, { project_id } = req.params

    // validate path variables
    if (!file || !file?.path?.length || !file?.originalname?.length) return innovationResponseHandler.failedUploadingFile(res)

    // extract file data
    const { path, originalname } = file

    const result = await requestHandler.uploadAsset(user.Username, project_id, {path, originalName: originalname})
    if (result) innovationResponseHandler.fileUploadedSuccessfully(res)
    else innovationResponseHandler.failedUploadingFile(res)
}


// upload asset data to associated user
const deleteAsset = async (req, res) => {

    // extract req data
    const { user } = req, { project_id, asset_id } = req.params

    const result = await requestHandler.deleteAsset(user.Username, project_id, asset_id)
    if (result) innovationResponseHandler.fileDeletedSuccessfully(res)
    else innovationResponseHandler.fileNotfound(res)
}


// upload asset data to associated user
const sendAsset = async (req, res) => {

    // extract req data
    const {project_id, filename} = req.params, {user} = req

    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return innovationResponseHandler.innovationNotFound(res)

    // validate filename
    if (!/^[0-9.a-zA-Z]+$/.test(filename))
        return innovationResponseHandler.fileNotfound(res)

    // check if user's innovation stores the given asset filename
    if (user.Innovations[index].Assets.findIndex(a => a.path === filename) === -1) return innovationResponseHandler.fileNotfound(res)
    else innovationResponseHandler.fileFoundAndTransfered(res, `${ASSETS_FOLDER_PATH}/${filename}`)
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
    if (error) return innovationResponseHandler.incompleteFields(res)
    
    // create innovation
    const result = await requestHandler.createInnovation(user.Username, InnovationData)
    if (result) innovationResponseHandler.innovationCreatedSuccessfully(res, result)
    else innovationResponseHandler.failedCreatingInnovation(res, `Name \"${Name}\" is already occupied by another project`)
}


// delete an existing innovation
const deleteInnovation = async (req, res) => {

    const {project_id} = req.params, {user} = req

    // delete innovation
    const result = await requestHandler.deleteInnovation(user.Username, project_id)

    if (result.status) innovationResponseHandler.innovationDeletedSuccessfully(res)
    else if (result.data === 'INV_NOT_FOUND') innovationResponseHandler.innovationNotFound(res)
    else innovationResponseHandler.failedDeletingInnovation(res)
}


// Update an existing innovation's data
// requires: <req.user>, <req.req_privilege>
const updateInnovationData = async (req, res) => {

    // update non-empty data
    if (!req.body || !Object.keys(req.body).length) return innovationResponseHandler.incompleteFields(res)
    // extract data from request body
    const {username, project_id} = req.params, new_data = req.body, {user, req_privilege} = req

    // verify request parameters
    let error
    switch (req_privilege) {
        case PRIVILEGES.CONTRIBUTOR:
            // -- user is the innovation's contributor
            error = Joi_InnovationSchema_UpdatingData__contributor.validate(new_data).error
            break
        case PRIVILEGES.CREATOR:
            // -- user is the innovation's creator
            error = Joi_InnovationSchema_UpdatingData__creator.validate(new_data).error
            break
        default:
            // -- no access to outsiders
            return authResponseHandler.accessDenied(res)
    }
    if (error) return innovationResponseHandler.incompleteFields(res, error.message)

    // update data
    const result = await requestHandler.updateInnovation(username, project_id, new_data)
    if (result.status) return innovationResponseHandler.innovationUpdatedSuccessfully(res, result.data)
    else if (result.data === 'INV_NOT_FOUND') return innovationResponseHandler.innovationNotFound(res)
    else if (result.data === 'NAME_OCCUPIED') return innovationResponseHandler.failedUpdatingInnovation(res, `Name \"${new_data.Name}\" is already occupied by another innovation`)
    else return innovationResponseHandler.failedUpdatingInnovation(res)
}


// Get innovation data
// requires: <req.user>, <req.innovationIndex>
const getInnovationData = async (req, res) => {
    return innovationResponseHandler.innovationSentSuccessfully(res, req.user.Innovations[req.innovationIndex])
}


module.exports = {uploadAsset, createInnovation, deleteInnovation, sendAsset ,updateInnovationData, deleteAsset, getInnovationData}