// types for invention actions & reducer

import { INVENTION_USER_ROLES } from "../../../configs/_client"
import { SharedProjectsResponseType, UpdateInventionType, UploadAssetType } from '../../../types/data/invention.types'


// invention-reducer state type
export type InventionStateType = {
    Invention: SharedProjectsResponseType | null,
    InventionUserRole: INVENTION_USER_ROLES | null,
    ViewAssetsIdx: number | null
}


// invention-actions types

export type InventionActionTypes = {
    updateInvention: { data: UpdateInventionType, project_id: string }
    storeInvention: { Invention: SharedProjectsResponseType, my_user_id?: string }
    asset: {
        upload: { project_id: string, data: UploadAssetType }
        delete: { project_id: string, asset_id: string }
    }
}