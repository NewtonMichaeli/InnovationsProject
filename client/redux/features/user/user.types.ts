// types for user actions & reducer

// types
import { action } from "../../../types/data/global.types"
import { AssetType, ContributorType, FormInventionType, SharedProjectsResponseType } from "../../../types/data/invention.types"
import { REGIONS_ENUM, UpdateUserType, UserType } from "../../../types/data/user.types"


// user-reducer state type
export type UserStateType = {
    isLoading: boolean,
    User: UserType | null,
    isAuthenticated: boolean
}


// user-actions types

export type UserActionTypes = {
    follow: { action: action, target_user: string }
    login: { Username: string, Password: string }
    register: { Username: string, Password: string, Fname: string, Sname: string, Email: string, Region: keyof typeof REGIONS_ENUM }
    updateUser: UpdateUserType
    createInvention: { data: FormInventionType }
    updateInvention: SharedProjectsResponseType
    inviteToProject: { project_id: string, action: action, user_id: string, roles?: ContributorType['Roles'] }
    assets: {
        upload: { data: AssetType[], project_id: string }
        delete: { asset_id: string, project_id: string }
    }
}