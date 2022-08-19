// config file for client url-endpoints, enums, etc

import { STATUS_ENUM } from "../types/data/invention.types"


// invention sections, currently 3/4 are editable
export type INVENTION_SECTIONS = 'members' | 'information' | 'assets' | 'aboutyou'

// invention user roles, 3 in total
export enum INVENTION_USER_ROLES {
    CREATOR = "CREATOR",
    CONTRIBUTOR = "CONTRIBUTOR",
    OBSERVER = "OBSERVER"
}


// default search limit (explore)
export const DEF_SEARCH_LIMIT = 5

// shorthand for getting assets from /public directory
export const PUBLIC_SRC = {
    PROFILE_PIC: (n: number) => `/profile-pics/${n}.jpeg`,
    INVENTION_STATUS: (status: keyof typeof STATUS_ENUM) => `/invention-status-icons/${status.replace(' ', '-')}.svg`
}

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
    NEW_PROJECT: '/new-project',
    _USER: (username: string) => `/user/${username}`,
    _INVENTION: (project_id: string) => `/invention/${project_id}`,
    _INVENTION_EDIT_TAB: (project_id: string, section: INVENTION_SECTIONS) => `/invention/${project_id}?edit=${section}`,
    _DASHBOARD: (project_id: string) => `/my-projects/${project_id}`
}

// all unauthorized uris
const CLIENT_SECURED_URIS = [
    CLIENT_URIS.PROFILE,
    CLIENT_URIS.PROFILE_REDIRECTED_FROM_EXPLORE_PAGE,
    CLIENT_URIS.SETTINGS,
    CLIENT_URIS.STATSISTICS,
    CLIENT_URIS.DASHBOARD,
    CLIENT_URIS.NEW_PROJECT,
]

// check unauthorized uri using the above array
export const isAccessingSecuredUri = (pathname: string) =>
    pathname === CLIENT_URIS.HOME || CLIENT_SECURED_URIS.some(uri => pathname.startsWith(uri))