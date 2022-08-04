import { useRouter } from "next/router"
import { FC, useEffect } from "react"
// redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { userActions, userSelector } from "../../redux/features/user"
// utils
import { CLIENT_URIS, isAccessingSecuredUri } from "../../configs/_client"
// components
import Menu from "./Menu"
import Navbar from "./Navbar"
import Loading from "../global/loading"
import UINotifications from "./Ui"
// styles
import styles from '../../styles/components/layout/index.module.css'


/**
 * Layout middleware component - adds menu, navigation-bar, ui-notification-bar
 * @param children  children to render within the layout content-container
 * @returns the entire app-tree structured with a layout
 */
const Layout: FC<{children: JSX.Element[]}> = ({children}) => {
    // states
    const dispatch = useAppDispatch()
    const { push, pathname } = useRouter()
    const IsAccessingSecuredUri = isAccessingSecuredUri(pathname)
    const { isLoading, isAuthenticated, User } = useAppSelector(userSelector)
    
    // check authorization
    if (!isLoading && !isAuthenticated && IsAccessingSecuredUri)
        push(CLIENT_URIS.LOGIN, null, {shallow: true})
    
    // fetch user data on first load
    useEffect(() => {
        if (!User) dispatch(userActions.fetchUserData())
    }, [])
    
    return (
        <div className={styles['App']}>
            {/* main-menu */}
            <Menu />
            {/* app body */}
            <section className={styles["app-body"]}>
                {/* navigation-bar background */}
                <span className={styles['navbar-bg-svg']}></span>
                {/* navigation-bar */}
                <Navbar />
                <div className={styles["app-content"]}>
                    {/* content / loading */}
                    {(isLoading || !isAuthenticated || !User) && IsAccessingSecuredUri ? <Loading /> : children}
                    {/* ui-notifications */}
                    <UINotifications />
                </div>
            </section>
        </div>
    )
}

export default Layout