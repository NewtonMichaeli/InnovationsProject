import Link from 'next/link'
// types
import {FC, MouseEvent, useState} from 'react'
import { InventionType } from '../../types/data/invention.types'
import { MinifiedUserType } from '../../types/data/user.types'
import { CLIENT_URIS, PUBLIC_SRC } from '../../configs/_client'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userActions, userSelector } from '../../redux/features/user'
import { uiActions } from '../../redux/features/ui'
// styles
import styles from '../../styles/components/shared/userItem.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


// component: projects list to invite someone
const InviteToProject: FC<{
    UnparticipatingInventions: InventionType[],
    handleInviteToProjectBtn: (id: string) => unknown
}> = ({UnparticipatingInventions, handleInviteToProjectBtn}) => {
    // components
    const Invention: FC<{
        inv: InventionType
    }> = ({inv}) => {
        // handlers
        const onClick = (e: MouseEvent<any>) => {
            e.stopPropagation()
            handleInviteToProjectBtn(inv._id)
        }
        return (
            <div key={inv._id} className={styles["invention"]} onClick={onClick}>
                <code>{inv.Name}</code>
            </div>
        )
    }
    return (
        <div className={styles["Inventions-options"]}>
            {UnparticipatingInventions.map(inv => <Invention key={inv._id} inv={inv} />)}
        </div>
    )
}


export type followHandlerType = (action: 'add' | 'remove') => unknown
export type inviteToProjectHandlerType = (project_id: string) => unknown
/**
 * Component shorthandendly renders the social buttons of a user-item, or as an independant single-user-mode component
 * @param isFollowing       am i following the target user?
 * @param target_user_id    target user id
 * @param invitingUser      shared state, indicating the current id. (pass `target_user_id` when compnent is being used independantly)
 * @param setInviteUser     shared state setter, setting `invitingUser`. (pass null if `singleUserModeCD` exists)
 * @param singleUserModeCB  callback array. `param[0]` is the follow-handler cb, `param[1]` is the invite-to-project-handler cb. Pass these handlers when SocialButtons is an independant component.
 * @returns social buttons - handling follow & invite-to-project functionallities
 */
export const SocialButtons: FC<{
    isFollowing?: boolean,
    target_user_id: string,
    invitingUser: string,
    setInvitingUser: (id: string) => unknown,
    singleUserModeCB?: [followHandlerType, inviteToProjectHandlerType]
}> = ({isFollowing, target_user_id, setInvitingUser, invitingUser, singleUserModeCB}) => {
    // States
    const dispatch = useAppDispatch()
    const { User, isAuthenticated } = useAppSelector(userSelector)
    // -- conditional rendering states
    const [showInventionsOnSingleUserMode, setShowInventionsOnSingleUserMode] = useState(false)
    const isMe = invitingUser === target_user_id
    // -- participating inventions
    const UnparticipatingInventions = User?.Inventions.filter(inv => !inv.Contributors.some(c => c._id === target_user_id)) ?? []
    // Handlers
    const handleFollowBtn = async (e: MouseEvent<any>) => {
        e.stopPropagation()
        const action = isFollowing ? 'remove' : 'add'
        await dispatch(userActions.follow({action, target_user: target_user_id}))
        singleUserModeCB?.[0]?.(action)             // call callback when on single-user-mode
    }
    const handleInviteToProjectBtn = async (project_id: string) => {
        await dispatch(userActions.inviteToProject({project_id, user_id: target_user_id, action: 'add'}))
        setShowInventionsOnSingleUserMode(false)    // close inventions select box
        singleUserModeCB?.[1]?.(project_id)         // call callback when on single-user-mode
    }
    const setInvitingUserMode = () => {
        if (!isAuthenticated) dispatch(uiActions.pushFeedback({
            status: false,
            msg: "Can't invite users to projects while not logged in",
            redirect: { uri: CLIENT_URIS.LOGIN }
        }))
        else if (singleUserModeCB) setShowInventionsOnSingleUserMode(s => !s)
        else setInvitingUser(isMe ? null : target_user_id)
    }

    return (
        <section className={getStyles(`social-btns ${singleUserModeCB ? 'single-user-mode' : ''}`)}>
            <button className={getStyles(`btn-follow ${isFollowing ? 'following':''}`)} 
                title={`${isFollowing ? 'Unfollow':'Follow'} user`} onClick={handleFollowBtn}>
                Follow{isFollowing ? 'ing' : ''}
            </button>
            <button className={getStyles(`btn-invite-to-project ${UnparticipatingInventions.length ? '' : 'disable-btn'}`)} onClick={setInvitingUserMode} 
                title={UnparticipatingInventions.length ? 'Invite to project' : 'This user is participating in all of your projects!'}>
                Invite to project
                {UnparticipatingInventions.length > 0 && (singleUserModeCB ? showInventionsOnSingleUserMode : isMe) && 
                    <InviteToProject 
                        UnparticipatingInventions={UnparticipatingInventions} 
                        handleInviteToProjectBtn={handleInviteToProjectBtn} />}
            </button>
        </section>
    )
}


const UserItem: FC<{
    User: MinifiedUserType,         // -- my user information
    isSelf: boolean,                // -- am i the user
    isFollowing?: boolean,          // -- am i following this user
    isAuthenticated?: boolean,      // -- am i authenticated to follow people
    invitingUser: string,
    setInvitingUser: (id: string) => unknown
}> = ({User, isFollowing, isSelf, isAuthenticated, invitingUser, setInvitingUser}) => {

    return (
        <div className={styles["user-item"]}>
            {/* profile pic section */}
            <section className={styles["profile-pic"]}>
                <img src={PUBLIC_SRC.PROFILE_PIC(User.Profile_Pic)} alt={User.Username} />
            </section>
            {/* user data section */}
            <Link href={CLIENT_URIS._USER('[key]')} as={CLIENT_URIS._USER(User.Username)}>
                <section className={styles["user-data"]}>
                    <h2 className={styles["name"]}>{User.Fname} {User.Sname}</h2>
                    <h3 className={styles["username-x-email"]}>{User.Username}&nbsp;•&nbsp;{User.Email}</h3>
                </section>
            </Link>
            {/* social controls section */}
            {!isSelf && isAuthenticated && <SocialButtons isFollowing={isFollowing} target_user_id={User._id}
                invitingUser={invitingUser} setInvitingUser={setInvitingUser} />}
        </div>
    )
}


/**
 * @param Users         Minified Users array
 * @param isSelf        a callback, used to determine if the currently rendered user is the client
 * @param isFollowing   a callback, used to determine if client follows the rendered user
 * @returns a minified users list, with social buttons attached conditionally
 */
const UsersList: FC<{
    Users: MinifiedUserType[],
    isSelf: (id: string) => boolean,
    isFollowing?: (id: string) => boolean,
}> = ({Users, isSelf, isFollowing}) => {
    // states
    const { isAuthenticated, User } = useAppSelector(userSelector)
    const [invitingUser, setInvitingUser] = useState<string>(null)

    return <>{
        [...Users]
        .sort((a,b) => `${b.Fname}${b.Sname}` < `${a.Fname}${a.Sname}` || b.Username === User?.Username ? 1 : -1)
        .map(f => <UserItem 
            key={f._id} User={f} isSelf={isSelf(f._id)} isAuthenticated={isAuthenticated} 
            isFollowing={isFollowing(f._id)}
            invitingUser={invitingUser} 
            setInvitingUser={setInvitingUser} />)
    }</>
}


export default UsersList
