import {FC, useState} from 'react'
// types
import { UserType } from '../../../types/data/user.types'
import { PUBLIC_SRC } from '../../../configs/_client'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { userSelector } from '../../../redux/features/user'
// utils
import { filterUsersByQuery } from '../../../utils/others/filterUsersByQuery'
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
// components
import UsersList from '../UsersList'
// styles
import styles from '../../../styles/components/shared/user-data-lists/list-following.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const ListFollowings: FC<{
    show: boolean,
    UserData: UserType,
    close: () => unknown
}> = ({show, close, UserData}) => {
    // states
    const { User } = useAppSelector(userSelector)
    // -- filter users list with query
    const [search, setSearch] = useState("")
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
                                onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles["content-followings-list"]}>
                        <UsersList 
                            Users={filterUsersByQuery(UserData.Following, search)}
                            isFollowing={fid => User?.Following.some(s => s._id === fid)}
                            isSelf={fid => User?._id === fid} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowings