// form handler for new-project page
import { createInvention__type } from "../../redux/features/user/user.actions"
import { FormInventionType, STATUS_ENUM } from '../../types/data/invention.types'


type newProjectInputHandler_type = (data: FormInventionType) => createInvention__type
// login form input handler
export const newProjectInputHandler: newProjectInputHandler_type = data => {
    // validation
    const { Name, Description, Status, Tags, Occupations, Roles, Contributors, Private = false } = data

    if (Name.length < 3 || Name.length > 26)
        throw Error("Name length should range between 3-26")
    if (Description.length < 1 || Description.length > 512)
        throw Error("Description length should range between 1-512")
    if (Occupations.length < 1 || Occupations.length > 9)
        throw Error("Occupations length should range between 1-9")
    // if (Roles.length < 1)
    //     throw Error("Roles length should be at least 1")
    if (!Status)
        throw Error(`Status should be one of the options: ${Object.keys(STATUS_ENUM).join(' | ')}`)
    if (Tags.length > 12)
        throw Error("Occupations max-length should be 12")

    return {
        new_invention_data: { ...data, Roles: ['Hi'] }
    }
}