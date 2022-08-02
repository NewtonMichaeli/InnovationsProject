import axios from 'axios'
import { SERVER_URI__GET_INVENTION_DATA, SERVER_URI__UPDATE_INVENTION, SERVER_URI__UPLOAD_ASSET } from '../../../configs/_server'
// types
import { fetchInventionData_type, updateInvention_type, uploadAsset_type } from '../types/invention.types'

// -- create axios instance with default configs
const axiosRequest = axios.create({
    withCredentials: true
})

// inventionAPI: fetch invention data
export const fetchInventionData: fetchInventionData_type = async ({ project_id }, headers) => {
    const res = await axiosRequest.get(
        SERVER_URI__GET_INVENTION_DATA(project_id),
        headers
    )
    return res.data
}

// inventionAPI: update invention
export const updateInvention: updateInvention_type = async ({ project_id, data }, headers) => {
    const res = await axiosRequest.patch(
        SERVER_URI__UPDATE_INVENTION(project_id),
        { ...data, Contributors: data.Contributors.map(c => ({ user_id: c._id, roles: c.Roles })) },
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
        SERVER_URI__UPLOAD_ASSET(project_id),
        formdata,
        headers
    )
    return res.data
}