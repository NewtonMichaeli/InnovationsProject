import { useRouter } from "next/router"
import { FC } from "react"
// redux
import { useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"
// utils
import { CLIENT_URIS, isAccessingSecuredUri } from "../../configs/_client"
// components
import Menu from "./Menu"
import Navbar from "./Navbar"
import Loading from "../global/loading"
// styles
import styles from '../../styles/components/layout/index.module.css'


const Layout: FC<{children: JSX.Element[]}> = ({children}) => {
    // states
    const { isLoading, isAuthenticated } = useAppSelector(userSelector)
    const { push, pathname } = useRouter()
    const IsAccessingSecuredUri = isAccessingSecuredUri(pathname)

    // check authorization
    if (!isLoading && !isAuthenticated && IsAccessingSecuredUri)
        push(CLIENT_URIS.LOGIN, null, {shallow: true})

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
                    {(isLoading || !isAuthenticated) && IsAccessingSecuredUri ? <Loading /> : children}
                </div>
            </section>
        </div>
    )
}

export default Layout