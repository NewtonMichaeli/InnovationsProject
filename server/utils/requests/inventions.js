// Inventions request handler

const {ASSETS_FOLDER_PATH} = require('../../configs/_server')
const User = require('../../models/User')
const Invention = require('../../models/Invention')
const fs = require('fs')
const { _getDetailedUsersByArray } = require('./globals')
const { MINIFIED_USER_SELECT_VALUES } = require('../../configs/_database')


// Create (or add) a new invention
const createInvention = async (user_id, data) => {

    const user = await User.findById(user_id)
    const existing_invention = await Invention.findOne({
        Owner_id: user_id,
        Name: data.Name
    })
    // check if an equaly named project already exists
    if (existing_invention) return false

    // create & push new invention
    const new_invention = await new Invention(data)
    new_invention.save()
    user.Inventions.push(new_invention._id.toString())
    const result = await user.save()
    // return new invention
    return new_invention ?? false
}


// Update invention data
const updateInvention = async (user_id, project_id, data) => {

    const invention = await Invention.findById(project_id)

    // search for inventnions with the same name
    const existing_invention = await Invention.findOne({
        Owner_id: user_id,
        Name: data.Name
    })
    if (!invention) return {status: false, data: 'INV_NOT_FOUND'}
    
    // check name (must be unique)
    if (data.Name && existing_invention) return {status: false, data: 'NAME_OCCUPIED'}
    
    // assign new properties to invention
    Object.entries(data).map(prop => {
        if (data[prop[0]] !== undefined)
            invention[prop[0]] = prop[1]
    })

    // save new invention
    const result = await invention.save()
    return {
        status: result ? true : false, 
        data: result
    }
}


// Delete an existing invention
const deleteInvention = async (user_id, project_id) => {
    
    const user = await User.findById(user_id)
    const invention = Invention.findById(project_id)

    if (!invention) return {status: false, data: 'INV_NOT_FOUND'}

    // delete invention assets
    invention.Assets.map(({path}) => {
        try {
            fs.unlinkSync(`${ASSETS_FOLDER_PATH}/${path}`)
        }
        catch(err) {
            if (err?.code !== 'ENOENT') return false
        }
    })

    // delete invention
    user.Inventions = user.Inventions.filter(inv => inv !== project_id.toString())
    
    const invention_result = await Invention.findByIdAndDelete(project_id)
    const user_result = await user.save()

    return {status: invention_result && user_result ? true : false}
}


// Update contributors list
const updateContributorsList = async (user_id, project_id, action, dest_user_id, data) => {

    const user = await User.findById(user_id)
    if (!user) return {status: false, reason: 'USER_NOT_FOUND'}
    
    // find associated invention index
    const invention = await Invention.findById(project_id)
    if (!invention) return {status: false, reason: 'INV_NOT_FOUND'}

    // update contributors
    if (action === 'add') 
    {
        if (invention.Contributors.findIndex(({user_id}) => user_id === dest_user_id) !== -1)
            return {status: false, reason: 'CONTRIBUTOR_EXISTS'}
        invention.Contributors.push(data)
        // push project to dest_user's shared_projects
        await User.findByIdAndUpdate(
            dest_user_id, 
            {$push: {Shared_Projects: {project_id, user_id}}}
        )
    }
    else {
        if (invention.Contributors.findIndex(({user_id}) => user_id === dest_user_id) === -1)
            return {status: false, reason: 'CONTRIBUTOR_NOT_FOUND'}
        invention.Contributors = invention.Contributors.filter(c => c.user_id !== dest_user_id)
        // remove project from dest_user's shared_projects
        await User.findByIdAndUpdate(
            dest_user_id, 
            {$pull: {Shared_Projects: {project_id, user_id}}}
        )
    }

    const result = await invention.save()
    return {
        status: result ? true : false, 
        data: await _getDetailedUsersByArray(result.Contributors.map(c => c.user_id), MINIFIED_USER_SELECT_VALUES)
    }
}


const getInventionsByRegion = async (Regions, limit) => {

    // TODO: finish algorithm

    const inventions = await Invention.find({
        Private: false,
        // -- other search attributes
    }).limit(limit)

    const shuffled = inventions.sort(() => 0.5 - Math.random()).slice(0, limit)
    return shuffled
}


module.exports = {createInvention, deleteInvention, updateInvention, updateContributorsList, getInventionsByRegion}