// configs for client

// all client URIs
// underscore-prefix: methods for concatonating url params
export const CLIENT_URIS = {
    HOME: '/',
    EXPLORE: '/explore',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    STATSISTICS: '/statistics',
    DASHBOARD: '/my-projects',
    LOGIN: '/login',
    REGISTER: '/register',
    _DASHBOARD: (project_id: string) => `/my-projects/${project_id}`
}