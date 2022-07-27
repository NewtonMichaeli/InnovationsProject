// types for user reducer

// enums
export const STATUS_ENUM = {
    "open": "open",
    "in delevopment": "in delevopment",
    "finished": "finished"
}
export const REGIONS_ENUM = {
    "Asia": "Asia",
    "Europe": "Europe",
    "Americas": "Americas",
    "Australia": "Australia",
    "Africa": "Africa"
}

// assets type
export type AssetType = {
    path?: string,
    originalName: string,
    _id: string
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

// user-reducer state type
export type UserStateType = {
    isLoading: boolean,
    User: UserType | null,
    isAuthenticated: boolean
}