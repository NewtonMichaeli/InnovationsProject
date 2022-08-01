// User types

import { InventionType, SharedProjectsResponseType } from "./invention.types"

// enums
export const REGIONS_ENUM = {
    "Asia": "Asia",
    "Europe": "Europe",
    "Americas": "Americas",
    "Australia": "Australia",
    "Africa": "Africa"
}

// minified user type
export type MinifiedUserType = {
    Email: string,
    Fname: string,
    Profile_Pic: number,
    Sname: string,
    Username: string,
    _id: string
}

// new form-user type
export type FormUserType = {
    Fname: string,
    Sname: string,
    Username: string,
    Email: string,
    Region: keyof typeof REGIONS_ENUM,
    Profile_Pic: number
}

// updating form-user type
export type UpdateUserType = Partial<FormUserType>

// user type
export type UserType = {
    Fname: string,
    Sname: string,
    Username: string,
    Email: string,
    Profile_Pic: number,
    IsAdmin: boolean,
    Following: MinifiedUserType[],
    Followers: MinifiedUserType[],
    Region: keyof typeof REGIONS_ENUM,
    Inventions: InventionType[],
    Shared_Projects: SharedProjectsResponseType[],   // -- converted to regular invention struct inside the server
    type: String,
    required: true,
    _id: string,
    __v: number
}