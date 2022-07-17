import Link from "next/link"
import { useEffect } from 'react'
import { FC } from "react"
// redux
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { userSelector, userActions } from '../../redux/features/user'
// styles
import styles from '../../styles/components/layout/index.module.css'



const Navbar: FC = () => {
    
    // States
    const { User, isLoading, isAuthenticated } = useAppSelector(userSelector)
    const dispatch = useAppDispatch()
    console.log(User)

    // fetch user data
    useEffect(() => {
        if (!User) dispatch(userActions.fetchUserData())
    }, [])

    return (
        <div className={styles['Navbar']}>
            <Link href='/'>
                <img className={styles['logo-home-link']} src="/logo.svg" alt="App Logo" draggable='false' />
            </Link>
            <div className={styles["profile-btn"]}>
            {
                isLoading
                    ? <h1>loading</h1>
                    : !isAuthenticated
                        ? <h1>login</h1>
                        : <h1>normal</h1>
            }   
            </div>
        </div>
    )
}

export default Navbar