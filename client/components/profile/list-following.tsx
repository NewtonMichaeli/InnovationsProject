import {FC} from 'react'
// types
import { MinifiedUserType } from '../../redux/features/user/user.types'
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
    Following: MinifiedUserType
}> = ({Following}) => {
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
            <section className={styles["user-data"]}>
                <h2 className={styles["name"]}>{Following.Fname} {Following.Sname}</h2>
                <h3 className={styles["username-x-email"]}>{Following.Username} • {Following.Email}</h3>
            </section>
            <section className={styles["social-btns"]}>
                <button className={styles["btn-unfollow"]} title="Unfollow user" onClick={unfollowUser}>Following</button>
                <button className={styles["btn-invite-to-project"]} title="Invite to project">Invite to project</button>
            </section>
        </div>
    )
}


const ListFollowings: FC<{
    show: boolean,
    close: () => unknown
}> = ({show, close}) => {
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
                            <img src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt={User.Username} />
                        </div>
                        <div className={styles['input-search-followings']}>
                            <AiOutlineSearch className={styles['icon-search']} size={20} />
                            <input type="text" placeholder={`Search followings (${User.Followers.length})`} />
                        </div>
                    </div>
                    <div className={styles["content-followings-list"]}>
                        {/* TODO: server route -> get users data by a given user_id array */}
                        {User.Following.map(f => 
                            <FollowingItem key={f._id} Following={f} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowings