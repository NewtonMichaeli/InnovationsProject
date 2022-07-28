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
import { loginInputHandler } from '../utils/forms/login.form'
// styles
import styles from '../styles/pages/login.module.css'


const Login: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { push } = useRouter()
    const { isLoading, isAuthenticated } = useAppSelector(userSelector)
    // handlers
    const loginHandler = (e: FormEvent<HTMLFormElement>) => {
        try {
            dispatch(userActions.login(loginInputHandler(e)))
        }
        catch (err) {
            dispatch(uiActions.pushFeedback({status: false, msg: err.message}))
        }
    }

    // -- wait for authorization status
    if (isLoading) return <></>
    // -- wait for authorization status
    else if (!isAuthenticated) return (
        <main className={styles["Login"]}>
            <Head>
                <title>Login - Innovation</title>
            </Head>
            <form className={styles["login-form"]} onSubmit={loginHandler}>
                <div className={styles["form-header"]}>
                    <h1>Login</h1>
                    <h6>Sign in to continue using Dashboard</h6>
                </div>
                <div className={styles["form-body"]}>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="username">Email or username</label>
                        <input type="text" name='Username' id='username' />
                    </div>
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='Password' id='password' />
                    </div>
                    <div className={styles["rememberme-container"]}>
                        <div className={styles["input-container"]}>
                            <input type="checkbox" id="rememberme" />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <code>Forgot password?</code>
                    </div>
                </div>
                <div className={styles["form-footer"]}>
                    <input type="submit" value="LOGIN" />
                    <Link href={CLIENT_URIS.REGISTER}>
                        <a className={styles['register-link']}>Don't have an account? <span>Register here</span></a>
                    </Link>
                </div>
            </form>
        </main>
    )
    // -- avoid login when already authorized
    else push(CLIENT_URIS.HOME)
}


export default Login