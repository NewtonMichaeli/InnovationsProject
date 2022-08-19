// config file for server apis & routes

import { action } from "../types/data/global.types"


// Server URI - currently unsecured (http)
export const SERVER_URI = 'http://localhost:8084'


// Server apis:
export const SERVER_AUTH_API = SERVER_URI + '/api/auth'
export const SERVER_INVENTION_API = SERVER_URI + '/api/inventions'
export const SERVER_ASSETS_API = SERVER_INVENTION_API + '/assets'


/**
 * Server api routes tree
 */
export const SERVER_API = {
    /**
     * Auth api
     */
    auth: {
        follow_user: (action: action, target_user: string) => `${SERVER_AUTH_API}/followings/${action}/${target_user}`,
        search_by_query: (query: string, limit: number = 20) => `${SERVER_AUTH_API}/search/${query}/${limit}`,
        get_user_data: (username?: string) => `${SERVER_AUTH_API}/${username ?? ''}`,
        login: () => `${SERVER_AUTH_API}/signin`,
        register: () => `${SERVER_AUTH_API}/signup`,
        update_user: () => SERVER_AUTH_API
    },
    /**
     * Invention api
     */
    invention: {
        get_invention_data: (project_id?: string) => `${SERVER_INVENTION_API}/${project_id ?? ''}`,
        create_invention: () => SERVER_INVENTION_API,
        update_invention: (project_id: string) => `${SERVER_INVENTION_API}/${project_id}`,
        delete_invention: (project_id: string) => `${SERVER_INVENTION_API}/${project_id}`,
        invite_to_project: (project_id: string, action: action, user_id: string) =>
            `${SERVER_INVENTION_API}/contributors/${project_id}/${action}/${user_id}`
    },
    /**
     * Assets api
     */
    assets: {
        get_asset: (project_id: string, filename: string) => `${SERVER_ASSETS_API}/${project_id}/${filename}`,
        download_asset: (project_id: string, filename: string) => `${SERVER_ASSETS_API}/${project_id}/${filename}/d`,
        upload_asset: (project_id: string) => `${SERVER_ASSETS_API}/${project_id}`,
        delete_asset: (project_id: string, asset_id: string) => `${SERVER_ASSETS_API}/${project_id}/${asset_id}`
    }
}
