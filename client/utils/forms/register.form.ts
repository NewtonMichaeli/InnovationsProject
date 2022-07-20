// form handler for register page
import { FormEvent } from "react"
import { register__type } from "../../redux/features/user/user.actions"


type registerInputHandler_type = (e: FormEvent<HTMLFormElement>) => register__type
// register form input handler
export const registerInputHandler: registerInputHandler_type = e => {
    e.preventDefault()
    // extract data
    const { value: Fname } = e.target[0],
        { value: Sname } = e.target[1],
        { value: Username } = e.target[2],
        { value: Email } = e.target[3],
        { value: Password } = e.target[4],
        { value: Region } = e.target[5],
        { checked: AgreedWithTermsOfUse } = e.target[6]

    // validate values
    if (Fname.length < 2 || Fname.length > 26) throw Error('First name length must be between 2 and 26')
    if (Sname.length < 2 || Sname.length > 26) throw Error('Last name length must be between 2 and 26')
    if (Username.length < 2 || Username.length > 28) throw Error('Username length must be between 2 and 28')
    if (Email.length < 6 || Email.length > 42) throw Error('Email length must be between 6 and 42')
    if (Password.length < 6 || Password.length > 36) throw Error('Password length must be between 6 and 36')
    if (!Region) throw Error('Must select at least one region')
    if (!AgreedWithTermsOfUse) throw Error('Must agree to the terms of use before signing up')
    // return data
    return { Fname, Sname, Username, Email, Password, Region }
}