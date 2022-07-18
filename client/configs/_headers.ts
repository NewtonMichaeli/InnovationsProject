// headers file

export const AUTH_TOKEN = 'auth-token'

export const tokenHeader = (token?: string) => ({ headers: { Cookie: `auth-token=${token}` } })