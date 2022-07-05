const { ASSETS_FOLDER_PATH } = require('../configs/_server')
// handlers
const requestHandler = require('../utils/requests/innovations')
const responseHandler = require('../utils/responses/innovations')
// validations
const {Joi_InnovationSchema, Joi_InnovationSchema_UpdatingData} = require('../validations/InnovationSchema')


// upload asset data to associated user
const uploadAsset = async (req, res) => {

    // extract req data
    const { user, file } = req, { project_id } = req.params

    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return responseHandler.incompleteFields(res)

    // validate path variables
    if (!file || !file?.path?.length || !file?.originalname?.length) return responseHandler.failedUploadingFile(res)

    // extract file data
    const { path, originalname } = file

    const result = await requestHandler.uploadAsset(user, index, {path, originalName: originalname})
    if (result) responseHandler.fileUploadedSuccessfully(res)
    else responseHandler.incompleteFields(res)
}


// upload asset data to associated user
const sendAsset = async (req, res) => {

    // extract req data
    const {project_id, filename} = req.params, {user} = req

    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return responseHandler.incompleteFields(res)

    // validate filename
    console.log(filename)
    if (!/^[0-9.a-zA-Z]+$/.test(filename))
        return responseHandler.fileNotfound(res)

    // check if user's innovation stores the given asset filename
    if (user.Innovations[index].Assets.findIndex(a => a.path === filename) === -1) return responseHandler.fileNotfound(res)

    else 
    responseHandler.fileFoundAndTransfered(res, `${ASSETS_FOLDER_PATH}/${filename}`)
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
    else responseHandler.failedCreatingInnovation(res, `The name \"${Name}\" is already occupied by another project`)
}


// delete an existing innovation
const deleteInnovation = async (req, res) => {

    const {project_id} = req.params, {user} = req

    // delete innovation
    const result = await requestHandler.deleteInnovation(user, project_id)

    if (result) responseHandler.innovationDeletedSuccessfully(res)
    else responseHandler.failedDeletingInnovation(res)
}


// Update an existing innovation's data
const updateInnovationData = async (req, res) => {

    // update non-empty data
    if (!req.body || !Object.keys(req.body).length) return responseHandler.incompleteFields(res)
    // extract data from request body
    const {project_id} = req.params, new_data = req.body, {user} = req
    
    console.log(req.body, new_data)
    
    // verify request data
    const {error} = Joi_InnovationSchema_UpdatingData.validate(new_data)
    console.log('error: ', error)
    if (error) return responseHandler.incompleteFields(res)
    
    // find innovation index by id
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    console.log('index: ', index)
    if (index === -1) return responseHandler.incompleteFields(res)
    
    // check name (to be unique)
    if (new_data.Name && user.Innovations.findIndex(inv => inv.Name === new_data.Name) !== -1) return responseHandler.incompleteFields(res)
    
    // assign new properties to innovation
    Object.entries(new_data).map(prop => {
        console.log(prop[0] + ':', prop[1])
        if (new_data[prop[0]] !== undefined)
            user.Innovations[index][prop[0]] = prop[1]
    })

    // save new innovation
    const result = await user.save()
    if (result) return responseHandler.innovationUpdatedSuccessfully(res, result.Innovations[index])
    else return responseHandler.failedUpdatingInnovation(res)
}


module.exports = {uploadAsset, createInnovation, deleteInnovation, sendAsset ,updateInnovationData}