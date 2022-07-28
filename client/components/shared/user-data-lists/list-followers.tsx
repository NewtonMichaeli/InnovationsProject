// types
import {FC} from 'react'
import { UserType } from '../../../redux/features/user/user.types'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { userSelector } from '../../../redux/features/user'
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
// components
import UsersList from '../UsersList'
// styles
import styles from '../../../styles/components/profile/list-followers.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const ListFollowers: FC<{
    show: boolean,
    UserData: UserType,
    close: () => unknown
}> = ({show, close, UserData}) => {
    // states
    const { User, isAuthenticated } = useAppSelector(userSelector)
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
                            <img src={`/profile-pics/${UserData.Profile_Pic}.jpeg`} alt={UserData.Username} />
                        </div>
                        <div className={styles['input-search-followers']}>
                            <AiOutlineSearch className={styles['icon-search']} size={20} />
                            <input type="text" placeholder={`Search followers (${UserData.Followers.length})`} />
                        </div>
                    </div>
                    <div className={styles["content-followers-list"]}>
                        {/* TODO: server route -> get users data by a given user_id array */}
                        <UsersList isFollowing={fid => User?.Following.some(s => s._id === fid)} Users={UserData.Followers} isSelf={fid => User?._id === fid} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowers
