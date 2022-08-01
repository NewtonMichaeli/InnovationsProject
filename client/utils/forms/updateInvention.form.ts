// form handler for register page
import { updateInvention__type } from "../../redux/features/invention/invention.actions"
import { UpdateInventionType } from "../../types/data/invention.types"


type updateInventionInputHandler_type = (data: UpdateInventionType, project_id: string) => updateInvention__type
// register form input handler
export const updateInventionInputHandler: updateInventionInputHandler_type = (data, project_id) => {

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
    return {
        updated_invention_data: data,
        project_id
    }
}