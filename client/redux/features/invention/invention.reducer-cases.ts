// invention reducer cases

// types
import { WritableDraft } from "immer/dist/internal"
import { getInventionUserRole } from "../../../utils/inventions.utils"
import { InventionStateType } from "./invention.types"
// actions
import { deleteAsset, searchByQuery, storeInvention, updateInvention, uploadAsset, viewAssetsIdx } from "./invention.actions"
import { DEF_SEARCH_LIMIT } from "../../../configs/_client"


type WritableInventionStateType = WritableDraft<InventionStateType>


// store-invention case:

export const storeInventionCase = (state: WritableInventionStateType, { payload }: ReturnType<typeof storeInvention>) => {
    state.Invention = payload.Invention
    state.InventionUserRole = getInventionUserRole(payload.Invention.Project, payload.my_user_id)
}


// update-invention cases:

export const updateInventionCases = {
    fulfilled: (state: WritableInventionStateType, { payload }: ReturnType<typeof updateInvention['fulfilled']>) => {
        state.Invention.Project = payload.Project
    }
}


// upload-asset cases:

export const assetActionCases = {
    upload: {
        fulfilled: (state: WritableInventionStateType, { payload }: ReturnType<typeof uploadAsset['fulfilled']>) => {
            state.Invention.Project.Assets = payload
        }
    },
    delete: {
        fulfilled: (state: WritableInventionStateType, { payload }: ReturnType<typeof deleteAsset['fulfilled']>) => {
            state.Invention.Project.Assets = state.Invention.Project.Assets.filter(a => a._id !== payload)
        }
    }
}


// view assets-idx cases:

export const viewAssetsIdxCase = (state: WritableInventionStateType, { payload }: ReturnType<typeof viewAssetsIdx>) => {
    if (payload >= 0 && payload < state.Invention.Project.Assets.length)
        // -- change asset indicator only when within bounds
        state.ViewAssetsIdx = payload
}


// view assets-idx cases:

export const searchByQueryCases = {
    pending: (state: WritableInventionStateType) => {
        state.SearchData.isLoading = true
    },
    fulfilled: (state: WritableInventionStateType, { payload }: ReturnType<typeof searchByQuery['fulfilled']>) => {
        state.SearchData = {
            query: payload.query,
            Data: payload.data,
            eol: payload.eol,
            isLoading: false
        }
    },
    rejected: (state: WritableInventionStateType) => {
        state.SearchData.isLoading = false
    }
}