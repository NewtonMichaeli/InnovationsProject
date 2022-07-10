const Joi = require('@hapi/joi')
const { PRIVILEGES } = require('../configs/_server')
const {Joi_RegionsSchema, AllowedRegions} = require('../validations/Regions')
// handlers
const requestHandler = require('../utils/requests/innovations')
const responseHandler = require('../utils/responses')
// validations
const Joi_ContributorSchema = require('../validations/ContributorSchema')
const {Joi_InnovationSchema, Joi_InnovationSchema_UpdatingData__creator, Joi_InnovationSchema_UpdatingData__contributor} = require('../validations/InnovationSchema')


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
    const result = await requestHandler.createInnovation(user.Username, InnovationData)
    if (result) responseHandler.innovationCreatedSuccessfully(res, result)
    else responseHandler.failedCreatingInnovation(res, `Name \"${Name}\" is already occupied by another project`)
}


// delete an existing innovation
const deleteInnovation = async (req, res) => {

    const {project_id} = req.params, {user} = req

    // delete innovation
    const result = await requestHandler.deleteInnovation(user.Username, project_id)

    if (result.status) responseHandler.innovationDeletedSuccessfully(res)
    else if (result.data === 'INV_NOT_FOUND') responseHandler.innovationNotFound(res)
    else responseHandler.failedDeletingInnovation(res)
}


// Update an existing innovation's data
// requires: <req.user>, <req.req_privilege>
const updateInnovationData = async (req, res) => {

    // update non-empty data
    if (!req.body || !Object.keys(req.body).length) return responseHandler.incompleteFields(res)
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
    if (error) return responseHandler.incompleteFields(res, error.message)

    // update data
    const result = await requestHandler.updateInnovation(username, project_id, new_data)
    if (result.status) return responseHandler.innovationUpdatedSuccessfully(res, result.data)
    else if (result.data === 'INV_NOT_FOUND') return responseHandler.innovationNotFound(res)
    else if (result.data === 'NAME_OCCUPIED') return responseHandler.failedUpdatingInnovation(res, `Name \"${new_data.Name}\" is already occupied by another innovation`)
    else return responseHandler.failedUpdatingInnovation(res)
}


// Get innovation data
// requires: <req.user>, <req.innovationIndex>
const getInnovationData = async (req, res) => {
    return responseHandler.innovationSentSuccessfully(res, req.user.Innovations[req.innovationIndex])
}


// Update contributors list
// requires: <req.user>
const updateContributorsList = async (req, res) => {

    const {roles} = req.body, {project_id, action, user_id} = req.params, {user} = req
    const data = {roles, user_id}

    // validate data
    switch (action) {
        case 'remove':
            break
        case 'add':
            const {error} = Joi_ContributorSchema.validate(data)
            if (error) return responseHandler.incompleteFields(res, error.message)
            break
        default:
            return responseHandler.incompleteFields(res, 'Must provide a valid action: "add" / "remove"')
    }
    
    // update list
    const result = await requestHandler.updateContributorsList(user._id, project_id, action, user_id, data)
    if (result.status) responseHandler.innovationContributorsUpdatedSuccessfully(res, action, result.data)
    else if (result.reason === 'INV_NOT_FOUND') responseHandler.innovationNotFound(res)
    else if (result.reason === 'CONTRIBUTOR_NOT_FOUND') responseHandler.contributorNotFound(res)
    else if (result.reason === 'CONTRIBUTOR_EXISTS') responseHandler.contributorAlreadyExists(res)
    else if (result.reason === 'USER_NOT_FOUND') authResponseHandler.userNotFound(res)
    else responseHandler.failedUpdatingInnovationContributors(res)
}


// Get random innovations by region
const getInnovationsByRegion = async (req, res) => {

    // TODO: get region
    let regions = []
    if (!req.body || !req.body.regions)
        regions = [...AllowedRegions]
    else if (Joi_RegionsSchema.validate(req.body.regions))
        regions = req.body.regions

    const result = await requestHandler.getInnovationsByRegion(regions, 5)
    return responseHandler.randomInnovationsFoundSucessfully(res, result)
}


module.exports = {createInnovation, deleteInnovation ,updateInnovationData, getInnovationData, updateContributorsList, getInnovationsByRegion}