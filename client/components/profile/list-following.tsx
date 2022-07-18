import Link from 'next/link'
// types
import {FC} from 'react'
import { MinifiedUserType, UserType } from '../../redux/features/user/user.types'
import { CLIENT_URIS } from '../../configs/_client'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userActions, userSelector } from '../../redux/features/user'
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
// styles
import styles from '../../styles/components/profile/list-following.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const FollowingItem: FC<{
    Following: MinifiedUserType,
    isMe: boolean,
}> = ({Following, isMe}) => {
    // states
    const dispatch = useAppDispatch()
    // handlers
    const unfollowUser = () => {
        dispatch(userActions.follow({action: 'remove', target_user: Following._id}))
    }

    return (
        <div className={styles["following-item"]}>
            <section className={styles["profile-pic"]}>
                <img src={`/profile-pics/${Following.Profile_Pic}.jpeg`} alt={Following.Username} />
            </section>
            <Link href={CLIENT_URIS._USER('[key]')} as={CLIENT_URIS._USER(Following.Username)}>
                <section className={styles["user-data"]}>
                    <h2 className={styles["name"]}>{Following.Fname} {Following.Sname}</h2>
                    <h3 className={styles["username-x-email"]}>{Following.Username} • {Following.Email}</h3>
                </section>
            </Link>
            {!isMe && <section className={styles["social-btns"]}>
                <button className={styles["btn-unfollow"]} title="Unfollow user" onClick={unfollowUser}>Following</button>
                <button className={styles["btn-invite-to-project"]} title="Invite to project">Invite to project</button>
            </section>}
        </div>
    )
}


const ListFollowings: FC<{
    show: boolean,
    UserData: UserType,
    close: () => unknown
}> = ({show, close, UserData}) => {
    // states
    const { User } = useAppSelector(userSelector)
    // handlers
    const onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        close()
    }

    return (
        // wrapper - has no dimensions, referencing parent position for clip-path property
        <div className={getStyles(`list-followings-wrapper ${show ? 'show':''}`)}>
            {/* absolute container frame */}
            <div className={styles["list-followings"]}>
                {/* content inside container */}
                <div className={styles["content"]}>
                    <div className={styles["content-header"]}>
                        <div className={styles["profile-pic"]} onClick={onClose} title="Leave Folowings tab">
                            <BsArrowLeftShort size={36} />
                            <img src={`/profile-pics/${UserData.Profile_Pic}.jpeg`} alt={UserData.Username} />
                        </div>
                        <div className={styles['input-search-followings']}>
                            <AiOutlineSearch className={styles['icon-search']} size={20} />
                            <input type="text" placeholder={`Search followings (${UserData.Followers.length})`} />
                        </div>
                    </div>
                    <div className={styles["content-followings-list"]}>
                        {/* TODO: server route -> get users data by a given user_id array */}
                        {UserData.Following.map(f => 
                            <FollowingItem key={f._id} Following={f} isMe={User._id === f._id} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowings