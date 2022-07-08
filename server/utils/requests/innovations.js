// Innovations request handler

const {ASSETS_FOLDER_PATH} = require('../../configs/_server')
const User = require('../../models/User')
const fs = require('fs')


// Create (or add) a new innovation
const createInnovation = async (Username, data) => {

    const user = await User.findOne({Username})
    // check if an equaly named project already exists
    if (user.Innovations.findIndex(inv => inv.Name === data.Name) !== -1) return false

    // push new innovation
    user.Innovations.push(data)
    const result = await user.save()
    return result.Innovations[result.Innovations.length - 1] ?? false
}


// Update innovation data
const updateInnovation = async (Username, project_id, data) => {

    const user = await User.findOne({Username})
    // find innovation index by id
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return {status: false, data: 'INV_NOT_FOUND'}
    
    // check name (must be unique)
    if (data.Name && user.Innovations.findIndex(inv => inv.Name === data.Name) !== -1) return {status: false, data: 'NAME_OCCUPIED'}
    
    // assign new properties to innovation
    Object.entries(data).map(prop => {
        if (data[prop[0]] !== undefined)
            user.Innovations[index][prop[0]] = prop[1]
    })

    // save new innovation
    const result = await user.save()
    return {
        status: result ? true : false, 
        data: result.Innovations[index]
    }
}


// Delete an existing innovation
const deleteInnovation = async (Username, project_id) => {
    
    const user = await User.findOne({Username})
    // find innovation index by id
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return {status: false, data: 'INV_NOT_FOUND'}

    // delete innovation assets
    user.Innovations[index].Assets.map(({path}) => {
        try {
            fs.unlinkSync(`${ASSETS_FOLDER_PATH}/${path}`)
        }
        catch(err) {
            if (err?.code !== 'ENOENT') return false
        }
    })

    // delete innovation
    user.Innovations = user.Innovations.filter(inv => inv._id.toString() !== project_id)
    const result = await user.save()
    return {status: result ? true : false}
}


// Update contributors list
const updateContributorsList = async (user_id, project_id, action, dest_user_id, data) => {

    const user = await User.findById(user_id)
    if (!user) return {status: false, reason: 'USER_NOT_FOUND'}
    
    // find associated innovation index
    const innovationIndex = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (innovationIndex === -1) return {status: false, reason: 'INV_NOT_FOUND'}

    // update contributors
    const Contributors = user.Innovations[innovationIndex].Contributors
    if (action === 'add') {
        if (user.Innovations[innovationIndex].Contributors.findIndex(({user_id}) => user_id === dest_user_id) !== -1)
            return {status: false, reason: 'CONTRIBUTOR_EXISTS'}
        else user.Innovations[innovationIndex].Contributors.push(data)
    }
    else {
        if (user.Innovations[innovationIndex].Contributors.findIndex(({user_id}) => user_id === dest_user_id) === -1)
            return {status: false, reason: 'CONTRIBUTOR_NOT_FOUND'}
        else user.Innovations[innovationIndex].Contributors = Contributors.filter(c => c.user_id !== dest_user_id)
    }

    const result = await user.save()
    return {status: result ? true:false, data: result.Innovations[innovationIndex].Contributors}
}


module.exports = {createInnovation, deleteInnovation, updateInnovation, updateContributorsList}