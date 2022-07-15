import { FC } from "react";
// components
import Menu from "./Menu"
import Navbar from "./Navbar";
// styles
import styles from '../../styles/components/layout/index.module.css'


const Layout: FC<{children: JSX.Element[]}> = ({children}) => {
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
                    {/* content */}
                    {children}
                </div>
            </section>
        </div>
    )
}

export default Layout