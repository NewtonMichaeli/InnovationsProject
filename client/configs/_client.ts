// configs for client

// all client URIs
// underscore-prefix: methods for concatonating url params
export const CLIENT_URIS = {
    HOME: '/',
    EXPLORE: '/explore',
    PROFILE: '/profile',
    PROFILE_REDIRECTED_FROM_EXPLORE_PAGE: '/profile?explored=true',
    SETTINGS: '/settings',
    STATSISTICS: '/statistics',
    DASHBOARD: '/my-projects',
    LOGIN: '/login',
    REGISTER: '/register',
    _USER: (user_id: string) => `/user/${user_id}`,
    _DASHBOARD: (project_id: string) => `/my-projects/${project_id}`
}