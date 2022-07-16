import axios from "axios"
import { SERVER_URI, SERVER_URI__GET_USER_DATA } from '../../configs/_server'

// -- create axios instance with default configs
const axiosRequest = axios.create({
    withCredentials: true
})

// userAPI: fetch user data
export const fetchUserData = async () => {
    const res = await axiosRequest.get(SERVER_URI__GET_USER_DATA)
    return res.data
}