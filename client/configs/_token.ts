// config file for token constants & utils


// auth-token cookie name
export const AUTH_TOKEN = 'auth-token'

// returns back a request-header with the given cookie
export const tokenHeader = (token?: string) => ({ headers: { Cookie: `auth-token=${token}` } })

// returns an expired version of the cookie, essentialy deleting it
export const deleteAuthTokenCookie = () => `${AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`