import {FC} from 'react'
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
// styles
import styles from '../../styles/components/profile/list-followers.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const FollowerItem: FC = () => {
    return (
        <div className={styles["FollowerItem"]}>

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
                        <div className={styles["profile-pic"]} onClick={onClose}>
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
                        {User.Followers.map(f => <FollowerItem key={f._id} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListFollowers
