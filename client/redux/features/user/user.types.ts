// types for user reducer

// enums
export type STATUS_ENUM = 'open' | 'in development' | 'finished'
export type REGIONS_ENUM = 'Asia' | 'Europe' | 'Americas' | 'Australia' | 'Africa'

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

// invantions type
export type InventionType = {
    Name: string,
    Description: string,
    DoC: number,
    DoF?: number,
    Status: STATUS_ENUM,
    Private: boolean,
    Tags: string[],
    Roles: string[],
    Occupations: string[],
    Assets: AssetType[],
    Contributors: ContributorType[],
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
    Region: REGIONS_ENUM,
    Inventions: InventionType[],
    Shared_Projects: SharedProjectsResponseType[],   // -- converted to regular invention struct inside the server
    type: String,
    required: true,
    _id: string,
    __v: number
}

// user-reducer state type
export type UserStateType = {
    token: string | null,
    isLoading: boolean,
    User: UserType | null,
    isAuthenticated: boolean
}