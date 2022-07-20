import { RequestWithHeaders } from "."
import { login__type, register__type } from "../../../redux/features/user/user.actions"
import { MinifiedUserType, UserType } from "../../../redux/features/user/user.types"

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
    { query: string, limit: number },
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