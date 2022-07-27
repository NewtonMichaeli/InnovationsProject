// configs file for server

// server uri - currently unsecured (http)
export const SERVER_URI = 'http://localhost:8084'

// apis:
export const SERVER_AUTH_API = SERVER_URI + '/api/auth'
export const SERVER_INVENTION_API = SERVER_URI + '/api/inventions'
export const SERVER_ASSETS_API = SERVER_INVENTION_API + '/assets'

// routes:

// Get authenticated user data
export const SERVER_URI__GET_USER_DATA = (username?: string) => `${SERVER_AUTH_API}/${username ?? ''}`

// Get asset
export const SERVER_URI__GET_ASSET = (project_id: string, filename: string) =>
    `${SERVER_ASSETS_API}/${project_id}/${filename}`

// Follow/Unfollow user
export const SERVER_URI__FOLLOW_USER = (action: 'add' | 'remove', target_user: string) =>
    `${SERVER_AUTH_API}/followings/${action}/${target_user}`

// search by query
export const SERVER_URI__SEARCH_BY_QUERY = (query: string, limit: number = 20) =>
    `${SERVER_AUTH_API}/search/${query}/${limit}`

// login
export const SERVER_URI__LOGIN = () => SERVER_AUTH_API + '/signin'

// register
export const SERVER_URI__REGISTER = () => SERVER_AUTH_API + '/signup'

// register
export const SERVER_URI__UPDATE_USER = () => SERVER_AUTH_API

// Get authenticated user data
export const SERVER_URI__GET_INVENTION_DATA = (project_id?: string) => `${SERVER_INVENTION_API}/${project_id ?? ''}`

// Create new invention endpoint
export const SERVER_URI__CREATE_INVENTION = () => SERVER_INVENTION_API

// invite to project endpoint
export const SERVER_URI__INVITE_TO_PROJECT = (project_id: string, action: 'add' | 'remove', user_id: string) =>
    `${SERVER_INVENTION_API}/contributors/${project_id}/${action}/${user_id}`