const { PRIVILEGES } = require('../configs/_server')
const {Joi_RegionsSchema, AllowedRegions} = require('../validations/Regions')
// handlers
const requestHandler = require('../utils/requests/inventions')
const responseHandler = require('../utils/responses')
// validations
const Joi_ContributorSchema = require('../validations/ContributorSchema')
const {Joi_InventionSchema, Joi_InventionSchema_UpdatingData__creator, Joi_InventionSchema_UpdatingData__contributor} = require('../validations/InventionSchema')
// utils
const { _getDetailedUsersByArray, getDetailedInvention } = require('../utils/requests/globals')
const { MINIFIED_USER_SELECT_VALUES } = require('../configs/_database')


// create a new invention
const createInvention = async (req, res) => {
    // extract requested invention data
    const {Name, Description, Tags, Roles, Occupations, Status, Private, Contributors} = req.body, {user} = req
    const InventionData = {
        Name, Description, Tags, Roles, Occupations, Status, Contributors, Private,
        // -- predefined values
        Assets: [], DoC: new Date().getTime(), Owner_id: user._id.toString()
    }

    // validate request data
    const {error} = Joi_InventionSchema.validate(InventionData)
    if (error) return responseHandler.incompleteFields(res)
    
    // create invention
    const result = await requestHandler.createInvention(user._id.toString(), InventionData)
    if (result) responseHandler.inventionCreatedSuccessfully(res, result)
    else responseHandler.failedCreatingInvention(res, `Name \"${Name}\" is already occupied by another project`)
}


// delete an existing invention
const deleteInvention = async (req, res) => {

    const {project_id} = req.params, {user} = req

    // delete invention
    const result = await requestHandler.deleteInvention(user._id.toString(), project_id)

    if (result.status) responseHandler.inventionDeletedSuccessfully(res)
    else if (result.data === 'INV_NOT_FOUND') responseHandler.inventionNotFound(res)
    else responseHandler.failedDeletingInvention(res)
}


// Update an existing invention's data
// requires: <req.user>, <req.req_privilege>
const updateInventionData = async (req, res) => {

    // update non-empty data
    if (!req.body || !Object.keys(req.body).length) return responseHandler.incompleteFields(res)
    // extract data from request body
    const {user_id, project_id} = req.params, new_data = req.body, {user, req_privilege} = req

    // verify request parameters
    let error
    switch (req_privilege) {
        case PRIVILEGES.CONTRIBUTOR:
            // -- user is the invention's contributor
            error = Joi_InventionSchema_UpdatingData__contributor.validate(new_data).error
            break
        case PRIVILEGES.CREATOR:
            // -- user is the invention's creator
            error = Joi_InventionSchema_UpdatingData__creator.validate(new_data).error
            break
        default:
            // -- no access to outsiders
            return responseHandler.accessDenied(res)
    }
    if (error) return responseHandler.incompleteFields(res, error.message)

    // update data
    const result = await requestHandler.updateInvention(user_id, project_id, new_data)
    if (result.status) return responseHandler.inventionUpdatedSuccessfully(res, result.data)
    else if (result.data === 'INV_NOT_FOUND') return responseHandler.inventionNotFound(res)
    else if (result.data === 'NAME_OCCUPIED') return responseHandler.failedUpdatingInvention(res, `Name \"${new_data.Name}\" is already occupied by another invention`)
    else return responseHandler.failedUpdatingInvention(res)
}


// Get invention data
// requires: <req.user>, <req.invention>
const getInventionData = async (req, res) => {
    return responseHandler.inventionSentSuccessfully(res, await getDetailedInvention(req.invention._doc))
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
    if (result.status) responseHandler.inventionContributorsUpdatedSuccessfully(res, action, result.data)
    else if (result.reason === 'INV_NOT_FOUND') responseHandler.inventionNotFound(res)
    else if (result.reason === 'CONTRIBUTOR_NOT_FOUND') responseHandler.contributorNotFound(res)
    else if (result.reason === 'CONTRIBUTOR_EXISTS') responseHandler.contributorAlreadyExists(res)
    else if (result.reason === 'USER_NOT_FOUND') responseHandler.userNotFound(res)
    else responseHandler.failedUpdatingInventionContributors(res)
}


// Get random inventions by region
const getInventionsByRegion = async (req, res) => {

    // TODO: get region
    let regions = []
    if (!req.body?.Regions)
        regions = [...AllowedRegions]
    else {
        const {error} = Joi_RegionsSchema.validate(req.body.Regions)
        if (!error) regions = req.body.Regions
        else return responseHandler.incompleteFields(res, error.message)
    }
    const result = await requestHandler.getInventionsByRegion(regions, 5)
    return responseHandler.randomInventionsFoundSucessfully(res, result)
}


module.exports = {createInvention, deleteInvention ,updateInventionData, getInventionData, updateContributorsList, getInventionsByRegion}