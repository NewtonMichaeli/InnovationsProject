import Link from "next/link"
import { FC, useEffect } from 'react'
// redux
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { userSelector, userActions } from '../../../redux/features/user'
// components
import Loading from "../../global/loading"
// styles
import styles from '../../../styles/components/layout/navbar.module.css'
import { ProfileSection_AuthorizedUser, ProfileSection_UnauthorizedUser } from "./ProfileSection"


const Navbar: FC = () => {
    
    // States
    const { User, isLoading, isAuthenticated } = useAppSelector(userSelector)
    const dispatch = useAppDispatch()
    console.log(User)
    // conditional rendered links-set
    const RenderProfileSection: FC = () => {
        if (isLoading) return <Loading width="1.2rem" />
        else if (isAuthenticated) return <ProfileSection_AuthorizedUser User={User} />
        else return <ProfileSection_UnauthorizedUser />
    }

    // fetch user data on first load
    useEffect(() => {
        if (!User) dispatch(userActions.fetchUserData())
    }, [])

    return (
        <div className={styles['Navbar']}>
            <Link href='/'>
                <img className={styles['logo-home-link']} src="/logo.svg" alt="App Logo" draggable='false' />
            </Link>
            <div className={styles["profile-section"]}>
                <RenderProfileSection />
            </div>
        </div>
    )
}

export default Navbar