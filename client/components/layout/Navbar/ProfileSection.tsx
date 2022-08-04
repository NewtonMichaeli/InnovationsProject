import Link from 'next/link'
import { FC, useState } from 'react'
// types
import { CLIENT_URIS, PUBLIC_SRC } from '../../../configs/_client'
import { UserType } from '../../../types/data/user.types'
import { deleteAuthTokenCookie } from '../../../configs/_token'
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { signout } from '../../../redux/features/user/user.actions'
import { userSelector } from '../../../redux/features/user'
// components
import Loading from '../../global/loading'
// icons
import { MdKeyboardArrowDown } from 'react-icons/md'
// styles
import styles from '../../../styles/components/layout/navbar.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'


// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


/**
 * Profile section for unauthorized user
 * @returns a component, rendering a login link for the user
 */
const ProfileSection_UnauthorizedUser: FC = () => {
    
    return (
        <Link href={CLIENT_URIS.LOGIN}>
            <a className={styles["btn-login"]}>Login</a>
        </Link>
    )
}


/**
 * Profile section for authorized user
 * @returns a component, rendering a user-profile-window
 */
const ProfileSection_AuthorizedUser: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { User } = useAppSelector(userSelector)
    const [viewProfile, setViewProfile] = useState(false)
    // handlers
    const logoutHandler = () => {
        document.cookie = deleteAuthTokenCookie()
        dispatch(signout())
    }
    
    return (
        <div className={styles["profile-viewer-wrapper"]}>
            <img className={styles['btn-view-profile']} onClick={() => setViewProfile(!viewProfile)} 
                src={PUBLIC_SRC.PROFILE_PIC(User.Profile_Pic)} alt={User.Username} title="View profile" />
            <MdKeyboardArrowDown size={20} />
            {/* profile viewer */}
            <div className={getStyles(`profile-viewer ${viewProfile ? 'view':''}`)}>
                <div className={styles["user-data"]}>
                    <img src={PUBLIC_SRC.PROFILE_PIC(User.Profile_Pic)} alt={User.Username} />
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


/**
 * Profile-section-renderer component
 * @returns the appropriate profile-section (checking user & authorization)
 */
const ProfileSection: FC = () => {
    const { isLoading, isAuthenticated } = useAppSelector(userSelector)
    if (isLoading) return <Loading width="1.2rem" />
    else if (isAuthenticated) return <ProfileSection_AuthorizedUser />
    else return <ProfileSection_UnauthorizedUser />
}


export default ProfileSection