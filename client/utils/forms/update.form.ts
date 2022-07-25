// form handler for register page
import { FormEvent } from "react"
import { updateUser__type } from "../../redux/features/user/user.actions"
import { UserType } from "../../redux/features/user/user.types"


type updateUserInputHandler_type = (e: FormEvent<HTMLFormElement>, ExistingUser: UserType) => updateUser__type
// register form input handler
export const updateUserInputHandler: updateUserInputHandler_type = (e, User) => {
    // TODO: adapt profile picture into login form & request (as number, will be an actual file in the future)
    e.preventDefault()
    // extract data
    const { value: Fname } = e.target[0],
        { value: Sname } = e.target[1],
        { value: Username } = e.target[2],
        { value: Email } = e.target[3],
        { value: Region } = e.target[4]

    const Profile_Pic = Math.floor(Math.random() * 10)

    const updatedData: updateUser__type = {
        Fname: User.Fname !== Fname ? Fname : undefined,
        Sname: User.Sname !== Sname ? Sname : undefined,
        Email: User.Email !== Email ? Email : undefined,
        Username: User.Username !== Username ? Username : undefined,
        Region: User.Region !== Region ? Region : undefined,
        Profile_Pic: User.Profile_Pic !== Profile_Pic ? Profile_Pic : undefined,
    }

    // validate values
    if (updatedData.Fname && (Fname.length < 2 || Fname.length > 26))
        throw Error('First name length must be between 2 and 26')
    if (updatedData.Sname && (Sname.length < 2 || Sname.length > 26))
        throw Error('Last name length must be between 2 and 26')
    if (updatedData.Username && (Username.length < 2 || Username.length > 28))
        throw Error('Username length must be between 2 and 28')
    if (updatedData.Email && (Email.length < 6 || Email.length > 42))
        throw Error('Email length must be between 6 and 42')

    // return data
    return updatedData
}