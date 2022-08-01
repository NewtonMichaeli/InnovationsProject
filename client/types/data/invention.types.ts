// Invention types & interfaces

import { MinifiedUserType } from "./user.types"

// enums
export const STATUS_ENUM = {
    "open": "open",
    "in delevopment": "in delevopment",
    "finished": "finished"
}

// assets type
export type AssetType = {
    path?: string,
    originalname: string,
    description: string,
    src: MinifiedUserType,  // -- converted from user_id in server
    _id: string
}

// create-asset type
export type UploadAssetType = {
    file: File,
    description: string
}

// contributors type (extends minified-user model)
export type ContributorType = MinifiedUserType & {
    Roles: string[]
}

// new form-invention type
export type FormInventionType = {
    Name: string,
    Description: string,
    Tags: string[],
    Status: keyof typeof STATUS_ENUM,
    Occupations: string[],
    Roles: string[],
    Contributors: ContributorType[],
    Private: boolean
}

// updating form-invention type
export type UpdateInventionType = Partial<FormInventionType>

// invantions type
export type InventionType = {
    Name: string,
    Description: string,
    DoC: number,
    DoF?: number,
    Status: keyof typeof STATUS_ENUM,
    Private: boolean,
    Tags: string[],
    Roles: string[],
    Occupations: string[],
    Assets: AssetType[],
    Contributors: ContributorType[],
    Owner_id: string,
    _id: string
}

// response type of shared projects
export type SharedProjectsResponseType = {
    CreatorData: { _id: string, Username: string, Profile_Pic: number }
    Project: InventionType
}