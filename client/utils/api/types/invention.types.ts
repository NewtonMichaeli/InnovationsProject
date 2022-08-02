import { RequestWithHeaders } from "."
import { deleteAsset__type } from "../../../redux/features/invention/invention.actions"
import { UploadAssetType, InventionType, SharedProjectsResponseType, UpdateInventionType, AssetType } from "../../../types/data/invention.types"

// types for api request utilities

export type fetchInventionData_type = RequestWithHeaders<
    { project_id?: string },
    { status: boolean, msg: string, data: SharedProjectsResponseType, isMyProject?: boolean }
>

export type updateInvention_type = RequestWithHeaders<
    { project_id: string, data: UpdateInventionType },
    { status: boolean, msg: string, data: SharedProjectsResponseType }
>

export type uploadAsset_type = RequestWithHeaders<
    { project_id: string, data: UploadAssetType },
    { status: boolean, msg: string, data: AssetType[] }
>

export type deleteAsset_type = RequestWithHeaders<
    deleteAsset__type,
    { status: boolean, msg: string }
>