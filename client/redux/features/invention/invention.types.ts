// types for invention reducer

import { INVENTION_USER_ROLES } from "../../../configs/_client"
import { SharedProjectsResponseType } from "../user/user.types"


// invention-reducer state type
export type InventionStateType = {
    Invention: SharedProjectsResponseType | null,
    InventionUserRole: INVENTION_USER_ROLES | null
}