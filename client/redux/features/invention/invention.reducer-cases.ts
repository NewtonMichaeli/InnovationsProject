// invention reducer cases

import { WritableDraft } from "immer/dist/internal"
import { getInventionUserRole } from "../../../utils/inventions.utils"
import { storeInvention } from "./invention.actions"
import { InventionStateType } from "./invention.types"


type WritableInventionStateType = WritableDraft<InventionStateType>


// store-invention case:

export const storeInventionCase = (state: WritableInventionStateType, { payload }: ReturnType<typeof storeInvention>) => {
    state.Invention = payload.Invention
    state.InventionUserRole = getInventionUserRole(payload.my_user_id, payload.Invention.Project)
}