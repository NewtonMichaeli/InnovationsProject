import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
// types
import {FC, FormEvent, useState} from 'react'
import { CLIENT_URIS } from '../../configs/_client'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userActions, userSelector } from '../../redux/features/user'
// icons
import { FiEdit2 } from 'react-icons/fi'
// components
import GoBack from '../../components/shared/GoBack'
// styles
import styles from '../../styles/pages/editProfile.module.css'
import { updateUserInputHandler } from '../../utils/forms/update.form'


const EditProfile: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { push } = useRouter()
    const { User, isLoading, isAuthenticated } = useAppSelector(userSelector)
    // handlers
    const updateUserHandler = (e: FormEvent<HTMLFormElement>) => {
        try {
            const data = updateUserInputHandler(e, User)
            dispatch(userActions.updateUser(data))
            push(CLIENT_URIS.PROFILE)
        }
        catch (err) {
            // temp - push error notification
            alert(err)
        }
    }

    // -- wait for authorization status
    if (isLoading) return <></>
    // -- wait for authorization status
    else if (isAuthenticated) return (
        <main className={styles["EditProfile"]}>
            <Head>
                <title>Edit profile - Innovation</title>
            </Head>
            <GoBack />
            <form className={styles["EditProfile-form"]} onSubmit={updateUserHandler}>
                <div className={styles["input-img-container"]}>
                    <img src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt="Profile Picture" />
                    <div className={styles["change-profile-pic"]} title="Change profile picture">
                        <FiEdit2 size={20} className={styles['icon']} />
                    </div>
                </div>
                <div className={styles["form-body"]}>
                    <div className={styles["input-name-text-container"]}>
                        <div className={styles["input-text-container"]}>
                            <label htmlFor="fname">First name</label>
                            <input type="text" name='Fname' id='fname' defaultValue={User.Fname} />
                        </div>
                        <div className={styles["input-text-container"]}>
                            <label htmlFor="fname">Last name</label>
                            <input type="text" name='Sname' id='sname' defaultValue={User.Sname} />
                        </div>
                    </div>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name='Username' id='username' defaultValue={User.Username} />
                    </div>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='Email' id='email' defaultValue={User.Email} />
                    </div>
                    {/* <div className={styles["input-text-container"]}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='Password' id='password' />
                    </div> */}
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="password">Region</label>
                        <select name="Region" id="region" defaultValue={User.Region}>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Americas">Americas</option>
                            <option value="Australia">Australia</option>
                            <option value="Africa">Africa</option>
                        </select>
                    </div>
                </div>
                <div className={styles["form-footer"]}>
                    <input type="submit" value="UPDATE" />
                </div>
            </form>
        </main>
    )
    // -- avoid EditProfile when already authorized
    else push(CLIENT_URIS.LOGIN)
}

export default EditProfile