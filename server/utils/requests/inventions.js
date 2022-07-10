// Inventions request handler

const {ASSETS_FOLDER_PATH} = require('../../configs/_server')
const User = require('../../models/User')
const fs = require('fs')


// Create (or add) a new invention
const createInvention = async (Username, data) => {

    const user = await User.findOne({Username})
    // check if an equaly named project already exists
    if (user.Inventions.findIndex(inv => inv.Name === data.Name) !== -1) return false

    // push new invention
    user.Inventions.push(data)
    const result = await user.save()
    return result.Inventions[result.Inventions.length - 1] ?? false
}


// Update invention data
const updateInvention = async (Username, project_id, data) => {

    const user = await User.findOne({Username})
    // find invention index by id
    const index = user.Inventions.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return {status: false, data: 'INV_NOT_FOUND'}
    
    // check name (must be unique)
    if (data.Name && user.Inventions.findIndex(inv => inv.Name === data.Name) !== -1) return {status: false, data: 'NAME_OCCUPIED'}
    
    // assign new properties to invention
    Object.entries(data).map(prop => {
        if (data[prop[0]] !== undefined)
            user.Inventions[index][prop[0]] = prop[1]
    })

    // save new invention
    const result = await user.save()
    return {
        status: result ? true : false, 
        data: result.Inventions[index]
    }
}


// Delete an existing invention
const deleteInvention = async (Username, project_id) => {
    
    const user = await User.findOne({Username})
    // find invention index by id
    const index = user.Inventions.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return {status: false, data: 'INV_NOT_FOUND'}

    // delete invention assets
    user.Inventions[index].Assets.map(({path}) => {
        try {
            fs.unlinkSync(`${ASSETS_FOLDER_PATH}/${path}`)
        }
        catch(err) {
            if (err?.code !== 'ENOENT') return false
        }
    })

    // delete invention
    user.Inventions = user.Inventions.filter(inv => inv._id.toString() !== project_id)
    const result = await user.save()
    return {status: result ? true : false}
}


// Update contributors list
const updateContributorsList = async (user_id, project_id, action, dest_user_id, data) => {

    const user = await User.findById(user_id)
    if (!user) return {status: false, reason: 'USER_NOT_FOUND'}
    
    // find associated invention index
    const inventionIndex = user.Inventions.findIndex(inv => inv._id.toString() === project_id)
    if (inventionIndex === -1) return {status: false, reason: 'INV_NOT_FOUND'}

    // update contributors
    const Contributors = user.Inventions[inventionIndex].Contributors
    if (action === 'add') {
        if (user.Inventions[inventionIndex].Contributors.findIndex(({user_id}) => user_id === dest_user_id) !== -1)
            return {status: false, reason: 'CONTRIBUTOR_EXISTS'}
        else user.Inventions[inventionIndex].Contributors.push(data)
    }
    else {
        if (user.Inventions[inventionIndex].Contributors.findIndex(({user_id}) => user_id === dest_user_id) === -1)
            return {status: false, reason: 'CONTRIBUTOR_NOT_FOUND'}
        else user.Inventions[inventionIndex].Contributors = Contributors.filter(c => c.user_id !== dest_user_id)
    }

    const result = await user.save()
    return {status: result ? true:false, data: result.Inventions[inventionIndex].Contributors}
}


const getInventionsByRegion = async (Regions, limit) => {

    // TODO: finish algorithm

    let inventions = []
    const result = await User.find({
        Regions, 
        Inventions: {$elemMatch: {Private: false}}
    }).limit(limit)
    // map
    result.map(user => {
        user.Inventions.map(inv => {
            if (!inv.Private)
                inventions.push({[user.Username]: inv})
        })
    })
    console.log('invs: ', inventions)
    return inventions
}


module.exports = {createInvention, deleteInvention, updateInvention, updateContributorsList, getInventionsByRegion}