// configs file for server

// server uri - currently unsecured (http)
export const SERVER_URI = 'http://localhost:8084'

// apis:
export const SERVER_AUTH_API = SERVER_URI + '/api/auth'
export const SERVER_INVENTION_API = SERVER_URI + '/api/invention'

// routes:

// Get authenticated user data
export const SERVER_URI__GET_USER_DATA = SERVER_AUTH_API