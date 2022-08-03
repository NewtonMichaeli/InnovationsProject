import { RequestWithHeaders } from "."
import { InventionActionTypes } from "../../../redux/features/invention/invention.types"
import { SharedProjectsResponseType, AssetType } from "../../../types/data/invention.types"
import { MinifiedUserType } from "../../../types/data/user.types"

// types for api request utilities

export type fetchInventionData_type = RequestWithHeaders<
    { project_id?: string },
    { status: boolean, msg: string, data: SharedProjectsResponseType, isMyProject?: boolean }
>

export type searchByQuery_type = RequestWithHeaders<
    { query: string, limit?: number, excludeUsers?: string[] },
    { status: boolean, msg: string, data: MinifiedUserType[] }
>

export type updateInvention_type = RequestWithHeaders<
    InventionActionTypes['updateInvention'],
    { status: boolean, msg: string, data: SharedProjectsResponseType }
>

export type uploadAsset_type = RequestWithHeaders<
    InventionActionTypes['asset']['upload'],
    { status: boolean, msg: string, data: AssetType[] }
>

export type deleteAsset_type = RequestWithHeaders<
    InventionActionTypes['asset']['delete'],
    { status: boolean, msg: string }
>