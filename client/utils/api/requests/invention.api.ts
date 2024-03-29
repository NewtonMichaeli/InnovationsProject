import axios from 'axios'
import { DEF_SEARCH_LIMIT } from '../../../configs/_client'
import { SERVER_API } from '../../../configs/_server'
// types
import { deleteAsset_type, fetchInventionData_type, searchByQuery_type, updateInvention_type, uploadAsset_type } from '../types/invention.types'

// -- create axios instance with default configs
const axiosRequest = axios.create({
    withCredentials: true
})

// inventionAPI: fetch invention data
export const fetchInventionData: fetchInventionData_type = async ({ project_id }, headers) => {
    const res = await axiosRequest.get(
        SERVER_API.invention.get_invention_data(project_id),
        headers
    )
    return res.data
}

// userAPI: search (users/inventions) by query
export const searchByQuery: searchByQuery_type = async ({ query, limit = DEF_SEARCH_LIMIT, excludeUsers }, headers) => {
    const res = await axiosRequest.post(
        SERVER_API.auth.search_by_query(query, limit),
        { excludeUsers },
        headers,
    )
    return res.data
}

// inventionAPI: update invention
export const updateInvention: updateInvention_type = async ({ project_id, data }, headers) => {
    const res = await axiosRequest.patch(
        SERVER_API.invention.update_invention(project_id),
        { ...data, Contributors: data.Contributors?.map(c => ({ user_id: c._id, roles: c.Roles })) },
        headers
    )
    return res.data
}

// inventionAPI: upload asset
export const uploadAsset: uploadAsset_type = async ({ project_id, data }, headers) => {
    const formdata = new FormData()
    formdata.append('description', data.description)
    formdata.append('file', data.file)
    const res = await axiosRequest.post(
        SERVER_API.assets.upload_asset(project_id),
        formdata,
        headers
    )
    return res.data
}

// inventionAPI: delete asset
export const deleteAsset: deleteAsset_type = async ({ project_id, asset_id }, headers) => {
    const res = await axiosRequest.delete(
        SERVER_API.assets.delete_asset(project_id, asset_id),
        headers
    )
    return res.data
}