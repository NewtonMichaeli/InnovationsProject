import axios from "axios"
import { SERVER_URI__FOLLOW_USER, SERVER_URI__GET_USER_DATA, SERVER_URI__SEARCH_BY_QUERY } from '../../configs/_server'

// -- create axios instance with default configs
const axiosRequest = axios.create({
    withCredentials: true
})

// userAPI: fetch user data
export const fetchUserData = async () => {
    const res = await axiosRequest.get(SERVER_URI__GET_USER_DATA)
    return res.data
}

// userAPI: follow/unfollow given user
export const follow = async (action: 'add' | 'remove', target_user: string) => {
    const res = await axiosRequest.patch(SERVER_URI__FOLLOW_USER(action, target_user))
    return res.data
}

// userAPI: search (users/inventions) by query
export const searchByQuery = async (query: string, limit: number = 20) => {
    const res = await axiosRequest.get(SERVER_URI__SEARCH_BY_QUERY(query, limit))
    return res.data
}