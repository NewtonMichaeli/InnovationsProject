import Link from 'next/link'
import { FC, useState } from 'react'
// types
import { CLIENT_URIS } from '../../../configs/_client'
import { UserType } from '../../../redux/features/user/user.types'
// icons
import { MdKeyboardArrowDown } from 'react-icons/md'
// styles
import styles from '../../../styles/components/layout/navbar.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'
import { deleteAuthTokenCookie } from '../../../configs/_token'
import { useAppDispatch } from '../../../hooks/redux'
import { signout } from '../../../redux/features/user/user.actions'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


export const ProfileSection_UnauthorizedUser: FC = () => {

    return (
        <Link href={CLIENT_URIS.LOGIN}>
            <a className={styles["btn-login"]}>Login</a>
        </Link>
    )
}


export const ProfileSection_AuthorizedUser: FC<{
    User: UserType
}> = ({User}) => {
    // states
    const dispatch = useAppDispatch()
    const [viewProfile, setViewProfile] = useState(false)
    // handlers
    const logoutHandler = () => {
        document.cookie = deleteAuthTokenCookie()
        dispatch(signout())
    }

    return (
        <div className={styles["profile-viewer-wrapper"]}>
            <img className={styles['btn-view-profile']} onClick={() => setViewProfile(!viewProfile)} 
                src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt={User.Username} title="View profile" />
            <MdKeyboardArrowDown size={20} />
            {/* profile viewer */}
            <div className={getStyles(`profile-viewer ${viewProfile ? 'view':''}`)}>
                <div className={styles["user-data"]}>
                    <img src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt={User.Username} />
                    <div className={styles["data"]}>
                        <h2 className={styles["username"]}>{User.Username}</h2>
                        <h5 className={styles["email"]}>{User.Email}</h5>
                    </div>
                </div>
                <div className={styles["buttons"]}>
                    <Link href={CLIENT_URIS.PROFILE}>
                        <button className={styles["btn-goto-profile"]}>My profile</button>
                    </Link>
                    <button className={styles["btn-sign-out"]} onClick={logoutHandler}>
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    )
}
