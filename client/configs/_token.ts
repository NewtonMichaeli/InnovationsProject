// headers file

export const AUTH_TOKEN = 'auth-token'

export const tokenHeader = (token?: string) => ({ headers: { Cookie: `auth-token=${token}` } })

export const deleteAuthTokenCookie = () => `${AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
