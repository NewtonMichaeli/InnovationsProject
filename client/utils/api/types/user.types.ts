import { RequestWithHeaders } from "."
import { login__type, register__type, updateUser__type } from "../../../redux/features/user/user.actions"
import { FormInventionType, InventionType, MinifiedUserType, UserType } from "../../../redux/features/user/user.types"

// types for api request utilities

export type fetchUserData_type = RequestWithHeaders<
    { username?: string },
    { status: boolean, msg: string, data: UserType, isSameUser?: boolean }
>

export type follow_type = RequestWithHeaders<
    { action: 'add' | 'remove', target_user: string },
    { status: boolean, msg: string, data: MinifiedUserType }
>

export type searchByQuery_type = RequestWithHeaders<
    { query: string, limit: number, excludeUsers?: string[] },
    { status: boolean, msg: string, data: MinifiedUserType[] }
>

export type login_type = RequestWithHeaders<
    login__type,
    { status: boolean, msg: string, data: UserType }
>

export type register_type = RequestWithHeaders<
    register__type,
    { status: boolean, msg: string, data: UserType }
>

export type updateUser_type = RequestWithHeaders<
    updateUser__type,
    { status: boolean, msg: string, data: { new_data: UserType } }
>

export type createInvention_type = RequestWithHeaders<
    { data: FormInventionType },
    { status: boolean, msg: string, data: InventionType }
>