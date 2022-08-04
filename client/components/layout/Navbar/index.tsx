import Link from "next/link"
import { FC } from 'react'
// components
import ProfileSection from "./ProfileSection"
// styles
import styles from '../../../styles/components/layout/navbar.module.css'


/**
 * @returns a rendered navigation-bar, sitting at the top of the layout section
 */
const Navbar: FC = () => {
    return (
        <div className={styles['Navbar']}>
            <Link href='/'>
                <img className={styles['logo-home-link']} src="/logo.svg" alt="App Logo" draggable='false' />
            </Link>
            <div className={styles["profile-section"]}>
                <ProfileSection />
            </div>
        </div>
    )
}

export default Navbar