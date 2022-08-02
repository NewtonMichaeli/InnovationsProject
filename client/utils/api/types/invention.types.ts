import { RequestWithHeaders } from "."
import { InventionActionTypes } from "../../../redux/features/invention/invention.types"
import { SharedProjectsResponseType, AssetType } from "../../../types/data/invention.types"

// types for api request utilities

export type fetchInventionData_type = RequestWithHeaders<
    { project_id?: string },
    { status: boolean, msg: string, data: SharedProjectsResponseType, isMyProject?: boolean }
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