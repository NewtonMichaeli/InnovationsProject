// types
import {FC, useState} from 'react'
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
import styles from '../../../styles/components/profile/list-following.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'
import { PUBLIC_SRC } from '../../../configs/_client'
import { filterUsersByQuery } from '../../../utils/others/filterUsersByQuery'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const ListFollowings: FC<{
    show: boolean,
    UserData: UserType,
    close: () => unknown
}> = ({show, close, UserData}) => {
    // states
    const { User } = useAppSelector(userSelector)
    // -- filtered users list
    const [filteredUsers, setFilteredUsers] = useState(User.Following)
    // handlers
    const onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        close()
    }

    return (
        // wrapper - has no dimensions, referencing parent position for clip-path-origin-position property
        <div className={getStyles(`list-followings-wrapper ${show ? 'show':''}`)}>
            {/* absolute container frame */}
            <div className={styles["list-followings"]}>
                {/* content inside container */}
                <div className={styles["content"]}>
                    <div className={styles["content-header"]}>
                        <div className={styles["profile-pic"]} onClick={onClose} title="Leave Folowings tab">
                            <BsArrowLeftShort size={36} />
                            <img src={PUBLIC_SRC.PROFILE_PIC(UserData.Profile_Pic)} alt={UserData.Username} />
                        </div>
                        <div className={styles['input-search-followings']}>
                            <AiOutlineSearch className={styles['icon-search']} size={20} />
                            <input type="text" placeholder={`Search followings (${UserData.Following.length})`}
                                onChange={e => setFilteredUsers(filterUsersByQuery(User.Following, e.target.value))} />
                        </div>
                    </div>
                    <div className={styles["content-followings-list"]}>
                        <UsersList isFollowing Users={filteredUsers} isSelf={fid => User?._id === fid} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowings