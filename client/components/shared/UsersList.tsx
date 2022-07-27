import Link from 'next/link'
// types
import {FC, MouseEvent, useState} from 'react'
import { InventionType, MinifiedUserType } from '../../redux/features/user/user.types'
import { CLIENT_URIS } from '../../configs/_client'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userActions, userSelector } from '../../redux/features/user'
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


/**
 * Component shorthandendly renders the social buttons of a user-item, or as an independant single-user-mode component
 * @returns Social buttons - follow, invite-to-ptoject functionallity
 */
export type followHandlerType = (action: 'add' | 'remove') => unknown
export type inviteToProjectHandler = (project_id: string) => unknown
export const SocialButtons: FC<{
    isFollowing?: boolean,
    target_user_id: string,
    invitingUser: string,
    setInvitingUser: (id: string) => unknown,
    singleUserModeCB?: [followHandlerType, inviteToProjectHandler]
}> = ({isFollowing, target_user_id, setInvitingUser, invitingUser, singleUserModeCB}) => {
    // states
    const { User } = useAppSelector(userSelector)
    const dispatch = useAppDispatch()
    // -- conditional rendering states
    const [showInventionsOnSingleUserMode, setShowInventionsOnSingleUserMode] = useState(false)
    const isMe = invitingUser === target_user_id
    // -- participating inventions
    const UnparticipatingInventions = User?.Inventions.filter(inv => !inv.Contributors.some(c => c._id === target_user_id)) ?? []
    // handlers
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
        if (singleUserModeCB) setShowInventionsOnSingleUserMode(s => !s)
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
                <img src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt={User.Username} />
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


const UsersList: FC<{
    Users: MinifiedUserType[],                              // -- my user information
    isSelf: (id: string) => boolean,                        // -- am i the user
    isFollowing?: ((id: string) => boolean) | boolean,      // -- am i following this user
    isAuthenticated?: boolean                               // -- am i authenticated to follow people
}> = ({Users, isSelf, isAuthenticated, isFollowing}) => {
    // states
    const [invitingUser, setInvitingUser] = useState<string>(null)

    return <>{
        Users.map(f => <UserItem isAuthenticated={isAuthenticated} key={f._id} User={f} isSelf={isSelf(f._id)} 
            isFollowing={typeof isFollowing === 'function' ? isFollowing(f._id) : isFollowing}
            invitingUser={invitingUser} setInvitingUser={setInvitingUser} />)
    }</>
}


export default UsersList
