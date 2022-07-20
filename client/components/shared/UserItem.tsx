import Link from 'next/link'
// types
import {FC} from 'react'
import { MinifiedUserType } from '../../redux/features/user/user.types'
import { CLIENT_URIS } from '../../configs/_client'
// redux
import { useAppDispatch } from '../../hooks/redux'
import { userActions } from '../../redux/features/user'
// styles
import styles from '../../styles/components/shared/userItem.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


// Component shorthandendly renders the social buttons of a user-item (conditionally)
const SocialButtons: FC<{
    isFollowing?: boolean,
    target_user: string
}> = ({isFollowing, target_user}) => {
    // states
    const dispatch = useAppDispatch()
    // handlers
    const handleFollowBtn = () => {
        dispatch(userActions.follow({action: isFollowing ? 'remove' : 'add', target_user}))
    }
    return (
        <section className={styles["social-btns"]}>
            <button className={getStyles(`btn-follow ${isFollowing ? 'following':''}`)} 
                title={`${isFollowing ? 'Unfollow':'Follow'} user`} onClick={handleFollowBtn}>
                Follow{isFollowing ? 'ing' : ''}
            </button>
            <button className={styles["btn-invite-to-project"]} title="Invite to project">Invite to project</button>
        </section>
    )
}


const UserItem: FC<{
    User: MinifiedUserType,         // -- my user information
    isSelf: boolean,                // -- am i the user
    isFollowing?: boolean,          // -- am i following this user
    isAuthenticated?: boolean       // -- am i authenticated to follow people
}> = ({User, isFollowing, isSelf, isAuthenticated}) => {

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
            {!isSelf && isAuthenticated && <SocialButtons isFollowing={isFollowing} target_user={User._id} />}
        </div>
    )
}

export default UserItem
