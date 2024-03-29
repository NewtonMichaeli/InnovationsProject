// form handler for register page
import { UserActionTypes } from "../../redux/features/user/user.types"
import { FormUserType, UserType } from '../../types/data/user.types'


// register form input handler
export const updateUserInputHandler = (User: UserType, data: FormUserType): UserActionTypes['updateUser'] => {

    // -- updated data objcwt with conditional keys
    const updatedData: UserActionTypes['updateUser'] = {
        ...(data.Fname !== User.Fname && { Fname: data.Fname }),
        ...(data.Sname !== User.Sname && { Sname: data.Sname }),
        ...(data.Email !== User.Email && { Email: data.Email }),
        ...(data.Username !== User.Username && { Username: data.Username }),
        ...(data.Region !== User.Region && { Region: data.Region }),
        ...(data.Profile_Pic !== User.Profile_Pic && { Profile_Pic: data.Profile_Pic }),
    }

    // validate values
    if (updatedData?.Fname?.length < 2 || updatedData?.Fname?.length > 26)
        throw Error('First name length must be between 2 and 26')
    if (updatedData?.Sname?.length < 2 || updatedData?.Sname?.length > 26)
        throw Error('Last name length must be between 2 and 26')
    if (updatedData?.Username?.length < 3 || updatedData?.Username?.length > 28)
        throw Error('Username length must be between 2 and 28')
    if (updatedData?.Email?.length < 6 || updatedData?.Email?.length > 42)
        throw Error('Email length must be between 6 and 42')
    if (!Object.keys(updatedData).length) throw Error('Nothing to update')

    // return data
    return updatedData
}