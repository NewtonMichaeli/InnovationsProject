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

// contributors type
export type ContributorType = {
    user_id: string,
    roles: string[],
    _id: string
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

// user type
export type UserType = {
    Fname: string,
    Sname: string,
    Username: string,
    Email: string,
    Profile_Pic: number,
    IsAdmin: boolean,
    Following: string[],
    Followers: string[],
    Region: REGIONS_ENUM,
    Inventions: InventionType[],
    Shared_Projects: InventionType[],   // -- converted to regular invention struct inside the server
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