import axios from 'axios'
import { SERVER_API } from '../../../configs/_server'
import { createInvention_type, inviteToProject_type } from '../types/user.types'
// types
import { fetchUserData_type, follow_type, register_type, login_type, updateUser_type } from '../types/user.types'

// -- create axios instance with default configs
const axiosRequest = axios.create({
    withCredentials: true
})

// userAPI: fetch user data
export const fetchUserData: fetchUserData_type = async ({ username }, headers) => {
    const res = await axiosRequest.get(
        SERVER_API.auth.get_user_data(username),
        headers
    )
    return res.data
}

// userAPI: follow/unfollow given user
export const follow: follow_type = async ({ action, target_user }, headers) => {
    const res = await axiosRequest.patch(
        SERVER_API.auth.follow_user(action, target_user),
        headers
    )
    return res.data
}

// userAPI: send login data
export const login: login_type = async (data, headers) => {
    const res = await axiosRequest.post(
        SERVER_API.auth.login(),
        data,
        headers
    )
    return res.data
}

// userAPI: send register data
export const register: register_type = async (data, headers) => {
    const res = await axiosRequest.post(
        SERVER_API.auth.register(),
        data,
        headers
    )
    return res.data
}

// userAPI: send update data
export const updateUser: updateUser_type = async (data, headers) => {
    const res = await axiosRequest.patch(
        SERVER_API.auth.update_user(),
        data,
        headers
    )
    return res.data
}

// inventionAPI: create new invention
export const createInvention: createInvention_type = async ({ data }, headers) => {
    const res = await axiosRequest.post(
        SERVER_API.invention.create_invention(),
        { ...data, Contributors: data.Contributors.map(c => ({ user_id: c._id, roles: c.Roles })) },
        headers
    )
    return res.data
}

// inventionAPI: invite to project
export const inviteToProject: inviteToProject_type = async ({ action, project_id, user_id, roles }, headers) => {
    const res = await axiosRequest.patch(
        SERVER_API.invention.invite_to_project(project_id, action, user_id),
        { roles },
        headers
    )
    return {
        ...res.data,
        data: {
            updated_contributors_list: res.data.data,
            project_id
        }
    }
}