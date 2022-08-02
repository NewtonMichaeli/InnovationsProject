// invention reducer cases

import { WritableDraft } from "immer/dist/internal"
import { getInventionUserRole } from "../../../utils/inventions.utils"
import { storeInvention, updateInvention, uploadAsset, viewAssetsIdx } from "./invention.actions"
import { InventionStateType } from "./invention.types"


type WritableInventionStateType = WritableDraft<InventionStateType>


// store-invention case:

export const storeInventionCase = (state: WritableInventionStateType, { payload }: ReturnType<typeof storeInvention>) => {
    state.Invention = payload.Invention
    state.InventionUserRole = getInventionUserRole(payload.Invention.Project, payload.my_user_id)
}


// update-invention cases:

export const updateInventionCases = {
    // pending: (state: WritableInventionStateType) => {
    //     state.isLoading = true
    // },
    fulfilled: (state: WritableInventionStateType, { payload }: ReturnType<typeof updateInvention['fulfilled']>) => {
        console.log('payloaf ', payload)
        state.Invention.Project = payload.Project
    },
    // rejected: (state: WritableUserStateType) => {
    //     state.isLoading = false
    // }
}


// upload-asset cases:

export const assetActionCases = {
    upload: {
        fulfilled: (state: WritableInventionStateType, { payload }: ReturnType<typeof uploadAsset['fulfilled']>) => {
            state.Invention.Project.Assets = payload
        }
    }
}


// view assets-idx cases:

export const viewAssetsIdxCase = (state: WritableInventionStateType, { payload }: ReturnType<typeof viewAssetsIdx>) => {
    if (payload >= 0 && payload < state.Invention.Project.Assets.length)
        // -- change asset indicator only when within bounds
        state.ViewAssetsIdx = payload
}