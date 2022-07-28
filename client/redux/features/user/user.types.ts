// types for user reducer

import { UserType } from "../../../types/data/user.types"

// user-reducer state type
export type UserStateType = {
    isLoading: boolean,
    User: UserType | null,
    isAuthenticated: boolean
}