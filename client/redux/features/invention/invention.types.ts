// types for invention actions & reducer

import { INVENTION_USER_ROLES } from "../../../configs/_client"
import { SharedProjectsResponseType, UpdateInventionType, UploadAssetType } from '../../../types/data/invention.types'
import { MinifiedUserType } from "../../../types/data/user.types"


// invention-reducer state type
export type InventionStateType = {
    Invention: SharedProjectsResponseType | null,
    InventionUserRole: INVENTION_USER_ROLES | null,
    ViewAssetsIdx: number | null,
    // -- explore page: search data
    SearchData: {
        Data: MinifiedUserType[],
        isLoading: boolean,
        eol: Boolean,
        query: string
    }
}


// invention-actions types

export type InventionActionTypes = {
    updateInvention: { data: UpdateInventionType, project_id: string }
    storeInvention: { Invention: SharedProjectsResponseType, my_user_id?: string }
    asset: {
        upload: { project_id: string, data: UploadAssetType }
        delete: { project_id: string, asset_id: string }
    }
    searchWithQuery: { query: string, limit?: number, loadMore?: boolean }
}