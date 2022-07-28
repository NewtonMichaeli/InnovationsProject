// form handler for register page
import { updateUser__type } from "../../redux/features/user/user.actions"
import { FormUserType, UserType } from "../../redux/features/user/user.types"


type updateUserInputHandler_type = (ExistingUser: UserType, data: FormUserType) => updateUser__type
// register form input handler
export const updateUserInputHandler: updateUserInputHandler_type = (User, data) => {

    const updatedData: updateUser__type = {
        Fname: User.Fname !== data.Fname ? data.Fname : undefined,
        Sname: User.Sname !== data.Sname ? data.Sname : undefined,
        Email: User.Email !== data.Email ? data.Email : undefined,
        Username: User.Username !== data.Username ? data.Username : undefined,
        Region: User.Region !== data.Region ? data.Region : undefined,
        Profile_Pic: User.Profile_Pic !== data.Profile_Pic ? data.Profile_Pic : undefined,
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

    // return data
    return updatedData
}