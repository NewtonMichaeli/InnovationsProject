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
import styles from '../../styles/components/profile/list-followers.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const FollowerItem: FC<{
    Follower: MinifiedUserType,
    isFollowing: boolean
}> = ({Follower, isFollowing}) => {
    // states
    const dispatch = useAppDispatch()
    // handlers
    const handleFollowBtn = () => {
        dispatch(userActions.follow({action: isFollowing ? 'remove' : 'add', target_user: Follower._id}))
    }

    return (
        <div className={styles["follower-item"]}>
            <section className={styles["profile-pic"]}>
                <img src={`/profile-pics/${Follower.Profile_Pic}.jpeg`} alt={Follower.Username} />
            </section>
            <section className={styles["user-data"]}>
                <h2 className={styles["name"]}>{Follower.Fname} {Follower.Sname}</h2>
                <h3 className={styles["username-x-email"]}>{Follower.Username} • {Follower.Email}</h3>
            </section>
            <section className={styles["social-btns"]}>
                <button className={getStyles(`btn-follow ${isFollowing ? 'following':''}`)} title={`${isFollowing ? 'Unfollow':'Follow'} user`} onClick={handleFollowBtn}>
                    Follow{isFollowing ? 'ing' : ''}
                </button>
                <button className={styles["btn-invite-to-project"]} title="Invite to project">Invite to project</button>
            </section>
        </div>
    )
}


const ListFollowers: FC<{
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
        <div className={getStyles(`list-followers-wrapper ${show ? 'show':''}`)}>
            {/* absolute container frame */}
            <div className={styles["list-followers"]}>
                {/* content inside container */}
                <div className={styles["content"]}>
                    <div className={styles["content-header"]}>
                        <div className={styles["profile-pic"]} onClick={onClose} title="Leave Followers tab">
                            <BsArrowLeftShort size={36} />
                            <img src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt={User.Username} />
                        </div>
                        <div className={styles['input-search-followers']}>
                            <AiOutlineSearch className={styles['icon-search']} size={20} />
                            <input type="text" placeholder={`Search followers (${User.Followers.length})`} />
                        </div>
                    </div>
                    <div className={styles["content-followers-list"]}>
                        {/* TODO: server route -> get users data by a given user_id array */}
                        {User.Followers.map(f => 
                            <FollowerItem key={f._id} Follower={f} isFollowing={User.Following.some(s => s._id === f._id)} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowers
