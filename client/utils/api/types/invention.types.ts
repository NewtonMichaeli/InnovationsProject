import { RequestWithHeaders } from "."
import { SharedProjectsResponseType } from "../../../types/data/invention.types"

// types for api request utilities

export type fetchInventionData_type = RequestWithHeaders<
    { project_id?: string },
    { status: boolean, msg: string, data: SharedProjectsResponseType, isMyProject?: boolean }
>