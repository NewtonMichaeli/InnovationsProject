import axios from 'axios'
import { SERVER_URI__FOLLOW_USER, SERVER_URI__GET_INVENTION_DATA, SERVER_URI__GET_USER_DATA, SERVER_URI__LOGIN, SERVER_URI__REGISTER, SERVER_URI__SEARCH_BY_QUERY, SERVER_URI__UPDATE_USER } from '../../../configs/_server'
// types
import { fetchUserData_type, follow_type, register_type, searchByQuery_type, login_type, fetchInventionData_type, updateUser_type } from '../types/user.types'

// -- create axios instance with default configs
const axiosRequest = axios.create({
    withCredentials: true
})

// userAPI: fetch user data
export const fetchUserData: fetchUserData_type = async ({ username }, headers) => {
    const res = await axiosRequest.get(
        SERVER_URI__GET_USER_DATA(username),
        headers
    )
    return res.data
}

// userAPI: follow/unfollow given user
export const follow: follow_type = async ({ action, target_user }, headers) => {
    const res = await axiosRequest.patch(
        SERVER_URI__FOLLOW_USER(action, target_user),
        headers
    )
    return res.data
}

// userAPI: search (users/inventions) by query
export const searchByQuery: searchByQuery_type = async ({ query, limit }, headers) => {
    const res = await axiosRequest.get(
        SERVER_URI__SEARCH_BY_QUERY(query, limit),
        headers
    )
    return res.data
}

// userAPI: send login data
export const login: login_type = async (data, headers) => {
    const res = await axiosRequest.post(
        SERVER_URI__LOGIN(),
        data,
        headers
    )
    return res.data
}

// userAPI: send register data
export const register: register_type = async (data, headers) => {
    const res = await axiosRequest.post(
        SERVER_URI__REGISTER(),
        data,
        headers
    )
    return res.data
}

// userAPI: send update data
export const updateUser: updateUser_type = async (data, headers) => {
    const res = await axiosRequest.patch(
        SERVER_URI__UPDATE_USER(),
        data,
        headers
    )
    return res.data
}

// userAPI: fetch invention data
export const fetchInventionData: fetchInventionData_type = async ({ project_id }, headers) => {
    const res = await axiosRequest.get(
        SERVER_URI__GET_INVENTION_DATA(project_id),
        headers
    )
    return res.data
}