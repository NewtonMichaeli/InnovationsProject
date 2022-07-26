import axios from 'axios'
import { SERVER_URI__GET_INVENTION_DATA } from '../../../configs/_server'
// types
import { fetchInventionData_type } from '../types/invention.types'

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