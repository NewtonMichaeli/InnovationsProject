import { RequestWithHeaders } from "."
import { UserActionTypes } from "../../../redux/features/user/user.types"
import { MinifiedUserType, UserType } from "../../../types/data/user.types"
import { ContributorType, InventionType } from '../../../types/data/invention.types'

// types for api request utilities

export type fetchUserData_type = RequestWithHeaders<
    { username?: string },
    { status: boolean, msg: string, data: UserType, isSameUser?: boolean }
>

export type follow_type = RequestWithHeaders<
    UserActionTypes['follow'],
    { status: boolean, msg: string, data: MinifiedUserType }
>

export type login_type = RequestWithHeaders<
    UserActionTypes['login'],
    { status: boolean, msg: string, data: UserType }
>

export type register_type = RequestWithHeaders<
    UserActionTypes['register'],
    { status: boolean, msg: string, data: UserType }
>

export type updateUser_type = RequestWithHeaders<
    UserActionTypes['updateUser'],
    { status: boolean, msg: string, data: { new_data: UserType } }
>

export type createInvention_type = RequestWithHeaders<
    UserActionTypes['createInvention'],
    { status: boolean, msg: string, data: InventionType }
>

export type inviteToProject_type = RequestWithHeaders<
    UserActionTypes['inviteToProject'],
    {
        status: boolean,
        msg: string,
        action: UserActionTypes['inviteToProject']['action'],
        data: { updated_contributors_list: ContributorType[], project_id: string }
    }
>