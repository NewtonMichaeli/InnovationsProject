import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
// types
import { FC, FormEvent } from 'react'
import { CLIENT_URIS } from '../configs/_client'
// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { userActions, userSelector } from '../redux/features/user'
import { uiActions } from '../redux/features/ui'
// utils
import { registerInputHandler } from '../utils/forms/register.form'
// styles
import styles from '../styles/pages/register.module.css'


const Register: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { push } = useRouter()
    const { isLoading, isAuthenticated } = useAppSelector(userSelector)
    // handlers
    const registerHandler = (e: FormEvent<HTMLFormElement>) => {
        try {
            dispatch(userActions.register(registerInputHandler(e)))
        }
        catch (err) {
            dispatch(uiActions.pushFeedback({status: false, msg: err.message}))
        }
    }

    // -- wait for authorization status
    if (isLoading) return <></>
    // -- wait for authorization status
    else if (!isAuthenticated) return (
        <main className={styles["Register"]}>
            <Head>
                <title>Register - Innovation</title>
            </Head>
            <form className={styles["register-form"]} onSubmit={registerHandler}>
                <div className={styles["form-header"]}>
                    <h1>Register</h1>
                </div>
                <div className={styles["form-body"]}>
                    <div className={styles["input-name-text-container"]}>
                        <div className={styles["input-text-container"]}>
                            <label htmlFor="fname">First name</label>
                            <input type="text" name='Fname' id='fname' />
                        </div>
                        <div className={styles["input-text-container"]}>
                            <label htmlFor="fname">Last name</label>
                            <input type="text" name='Sname' id='sname' />
                        </div>
                    </div>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name='Username' id='username' />
                    </div>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='Email' id='email' />
                    </div>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='Password' id='password' />
                    </div>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="password">Region</label>
                        <select name="Region" id="region">
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Americas">Americas</option>
                            <option value="Australia">Australia</option>
                            <option value="Africa">Africa</option>
                        </select>
                    </div>
                    <div className={styles["input-terms-of-use"]}>
                        <input type="checkbox" name="AgreedWithTermsOfUse" id="agreedWithTermsOfUse" />
                        <label htmlFor="agreedWithTermsOfUse">I agree with the <span>therms of use</span></label>
                    </div>
                </div>
                <div className={styles["form-footer"]}>
                    <input type="submit" value="REGISTER" />
                    <Link href={CLIENT_URIS.LOGIN}>
                        <a className={styles['register-link']}>Already have an account? <span>Login here</span></a>
                    </Link>
                </div>
            </form>
        </main>
    )
    // -- avoid register when already authorized
    else push(CLIENT_URIS.HOME)
}


export default Register