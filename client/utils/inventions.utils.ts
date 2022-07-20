// utils for inventions

import { UserType } from "../redux/features/user/user.types"


/**
 * Function unites inventions ans SharedProjects to one-typed-array (typeof SharedProjectsResponseType)
 * @param User (typeof UserType)
 * @returns Array containing both SharedProjects and Inventions formatted as <SharedProjectsResponseType>
 */
export const getSharedProjectsFormattedInventions = (User: UserType) => User ? [
    ...User.Shared_Projects,
    ...User.Inventions.map(inv =>
        ({ CreatorData: { Username: User.Username, _id: User._id, Profile_Pic: User.Profile_Pic }, Project: inv }))
] : []


/**
 * Function searches for an invention in a given User by a given id
 * @param User (typeof UserType)
 * @param project_id (typeof string)
 * @returns Invention at User[ idxof project_id ]
 */
export const findInvention = (User: UserType, project_id: string) => {
    // invention owner - default is current one
    let inventionOwner = { Username: User?.Username, Profile_Pic: User?.Profile_Pic }
    // find invention
    let current_invention = User?.Inventions.find(inv => inv._id === project_id) ??     // search invention in user-inventions-list
        User?.Shared_Projects.find(proj => {                                    // user doesn't own the invention - search in shared-projects
            // -- set invention creator username to it's owner
            if (proj.Project._id === project_id) {
                inventionOwner = { Username: proj.CreatorData.Username, Profile_Pic: proj.CreatorData.Profile_Pic }
                return true
            }
            return false
        })?.Project

    // return value
    return {
        owner: inventionOwner,
        data: current_invention
    }
}