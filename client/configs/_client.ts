// configs for client

// all client URIs
// underscore-prefix: methods for concatonating url params
export const CLIENT_URIS = {
    HOME: '/',
    EXPLORE: '/explore',
    PROFILE: '/profile',
    EDIT_PROFILE: '/profile/edit',
    PROFILE_REDIRECTED_FROM_EXPLORE_PAGE: '/profile?explored=true',
    SETTINGS: '/settings',
    STATSISTICS: '/statistics',
    DASHBOARD: '/my-projects',
    LOGIN: '/login',
    REGISTER: '/register',
    _USER: (user_id: string) => `/user/${user_id}`,
    _INVENTION: (user_id: string) => `/invention/${user_id}`,
    _DASHBOARD: (project_id: string) => `/my-projects/${project_id}`
}

// all unauthorized uris
export const CLIENT_SECURED_URIS = [
    // CLIENT_URIS.HOME,
    CLIENT_URIS.PROFILE,
    CLIENT_URIS.PROFILE_REDIRECTED_FROM_EXPLORE_PAGE,
    CLIENT_URIS.SETTINGS,
    CLIENT_URIS.STATSISTICS,
    CLIENT_URIS.DASHBOARD,
]

// check unauthorized uri using the above array
export const isAccessingSecuredUri = (pathname: string) =>
    pathname === CLIENT_URIS.HOME || CLIENT_SECURED_URIS.some(uri => pathname.startsWith(uri))