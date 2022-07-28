// filter users-list by given query util

import { MinifiedUserType } from "../../redux/features/user/user.types";

/**
 * @param Users     the users list to filter
 * @param query     the keyword in which users will be filtered by
 * @returns The users-list, filtered by the given keyword
 */
export const filterUsersByQuery = (Users: MinifiedUserType[], query: string): MinifiedUserType[] => {
    const loweredQuery = query.trim().toLowerCase()
    // -- invalid keyword
    if (!loweredQuery.length) return Users
    // -- check first & last names, username and email:
    else return Users.filter(u =>
        (`${u.Fname.toLowerCase()} ${u.Sname.toLowerCase()}`.includes(loweredQuery)) ||
        (u.Username.toLowerCase().includes(loweredQuery)) ||
        (u.Email.toLowerCase().includes(loweredQuery))
    )
}