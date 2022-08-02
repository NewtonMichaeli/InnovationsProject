// form handler for register page
import { InventionActionTypes } from "../../redux/features/invention/invention.types"
import { UpdateInventionType } from "../../types/data/invention.types"


// register form input handler
export const updateInventionInputHandler = (data: UpdateInventionType, project_id: string): InventionActionTypes['updateInvention'] => {

    // validate values
    if (data?.Name?.length < 2 || data?.Name?.length > 26)
        throw Error('Invention &&& length must be between 2 and 26')
    if (data?.Description?.length < 1 || data?.Description?.length > 512)
        throw Error('Invention &&& length must be between 1 and 512')
    if (data?.Occupations?.length < 1 || data?.Occupations?.length > 9)
        throw Error('Invention &&& length must be between 1 and 9')
    // if (data?.Roles?.length < MIN_LIMIT || data?.Roles?.length > MAX_LIMIT)
    //     throw Error('Invention &&& length must be between MIN and MAX')

    // return data
    return { data, project_id }
}