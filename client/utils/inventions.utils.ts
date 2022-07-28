// utils for inventions

import { INVENTION_USER_ROLES } from "../configs/_client"
import { UserType } from "../types/data/user.types"
import { InventionType, SharedProjectsResponseType } from '../types/data/invention.types'



/**
 * @param User (typeof UserType)
 * @param Inventions (typeof InventionType[])
 * @returns InventionType[] => SharedProjectResponseType[]
 */
export const formatInventionsToSharedProjects = (User: UserType): SharedProjectsResponseType[] =>
    User.Inventions.map(inv =>
        ({ CreatorData: { Username: User.Username, _id: User._id, Profile_Pic: User.Profile_Pic }, Project: inv }))


/**
 * Function unites inventions ans SharedProjects to one-typed-array (typeof SharedProjectsResponseType)
 * @param User (typeof UserType)
 * @returns Array containing both SharedProjects and Inventions formatted as <SharedProjectsResponseType>
 */
export const getSharedProjectsFormattedInventions = (User: UserType): SharedProjectsResponseType[] => User ? [
    ...User.Shared_Projects,
    ...formatInventionsToSharedProjects(User)
] : []


/**
 * Function unites inventions ans SharedProjects to one-typed-array (typeof SharedProjectsResponseType)
 * @param User (typeof UserType)
 * @returns Array containing both SharedProjects and Inventions formatted as <SharedProjectsResponseType>
 */
export const seperateSharedProjectsFormattedInventions = (User: UserType) => ({
    Shared_Projects: User.Shared_Projects,
    Inventions: formatInventionsToSharedProjects(User)
})


/**
 * Function searches for an invention in a given User by a given id
 * @param User (typeof UserType)
 * @param project_id (typeof string)
 * @returns Invention at User[ idxof project_id ]
 */
export const findInvention = (User: UserType, project_id: string) => {
    // invention owner - default is current one
    let inventionOwner = { Username: User?.Username, Profile_Pic: User?.Profile_Pic, _id: User?._id }
    // find invention
    // -- search invention in user-inventions-list
    let current_invention = User?.Inventions.find(inv => inv._id === project_id) ??
        // -- user doesn't own the invention - search in shared-projects
        User?.Shared_Projects.find(proj => {
            // -- set invention creator username to it's owner
            if (proj.Project._id === project_id) {
                inventionOwner = proj.CreatorData
                return true
            }
            return false
        })?.Project

    // return value
    return {
        CreatorData: inventionOwner,
        Project: current_invention
    }
}


/**
 * @param user_id (typeof string)
 * @param Invention (typeof InventionData)
 * @returns User role in given invention
 */
export const getInventionUserRole = (user_id: string, Invention: InventionType) => {
    if (Invention.Owner_id === user_id)
        return INVENTION_USER_ROLES.CREATOR
    else if (Invention.Contributors.some(c => c._id === user_id))
        return INVENTION_USER_ROLES.CONTRIBUTOR
    else return INVENTION_USER_ROLES.OBSERVER
}