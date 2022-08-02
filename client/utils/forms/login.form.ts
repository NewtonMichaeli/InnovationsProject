// form handler for login page
import { FormEvent } from "react"
import { UserActionTypes } from "../../redux/features/user/user.types"


// login form input handler
export const loginInputHandler = (e: FormEvent<HTMLFormElement>): UserActionTypes['login'] => {
    e.preventDefault()
    // extract data
    const { value: Username } = e.target[0], { value: Password } = e.target[1], { checked: RememberMe } = e.target[2]
    // validate values
    if (Username.length < 6 || Username.length > 32) throw Error('Username length must be between 6 and 32')
    if (Password.length < 6 || Password.length > 32) throw Error('Password length must be between 6 and 32')
    // return data
    return { Username, Password }
}