// configs file for server

// server uri - currently unsecured (http)
export const SERVER_URI = 'http://localhost:8084'

// apis:
export const SERVER_AUTH_API = SERVER_URI + '/api/auth'
export const SERVER_INVENTION_API = SERVER_URI + '/api/inventions'
export const SERVER_ASSETS_API = SERVER_INVENTION_API + '/assets'

// routes:

// Get authenticated user data
export const SERVER_URI__GET_USER_DATA = SERVER_AUTH_API

// Get asset
export const SERVER_URI__GET_ASSET = (username: string, project_id: string, filename: string) =>
    SERVER_ASSETS_API + `/${username}/${project_id}/${filename}`

// Follow/Unfollow user
export const SERVER_URI__FOLLOW_USER = (action: 'add' | 'remove', target_user: string) =>
    SERVER_AUTH_API + `/followings/${action}/${target_user}`

// search by query
export const SERVER_URI__SEARCH_BY_QUERY = (query: string, limit: number = 20) =>
    SERVER_AUTH_API + `/search/${query}/${limit}`