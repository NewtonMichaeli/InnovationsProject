import {FC, useState} from 'react'
// types
import { PUBLIC_SRC } from '../../../configs/_client'
import { UserType } from '../../../types/data/user.types'
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
import styles from '../../../styles/components/shared/user-data-lists/list-followers.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const ListFollowers: FC<{
    show: boolean,
    UserData: UserType,
    close: () => unknown
}> = ({show, close, UserData}) => {
    // States
    const { User } = useAppSelector(userSelector)
    // -- filter users list with query
    const [search, setSearch] = useState("")
    // Handlers
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
                            <img src={PUBLIC_SRC.PROFILE_PIC(UserData.Profile_Pic)} alt={UserData.Username} />
                        </div>
                        <div className={styles['input-search-followers']}>
                            <AiOutlineSearch className={styles['icon-search']} size={20} />
                            <input type="text" placeholder={`Search followers (${UserData.Followers.length})`} 
                                onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles["content-followers-list"]}>
                        <UsersList 
                            Users={filterUsersByQuery(UserData.Followers, search)} 
                            isFollowing={fid => User?.Following.some(s => s._id === fid)} 
                            isSelf={fid => User?._id === fid} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowers
