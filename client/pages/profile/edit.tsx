import Head from 'next/head'
import { useRouter } from 'next/router'
import {useState, FC, FormEvent} from 'react'
// types
import { CLIENT_URIS, PUBLIC_SRC } from '../../configs/_client'
import { FormUserType, REGIONS_ENUM } from '../../types/data/user.types'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userActions, userSelector } from '../../redux/features/user'
import { uiActions } from '../../redux/features/ui'
// utils
import { updateUserInputHandler } from '../../utils/forms/updateUser.form'
// icons
import { FiEdit2 } from 'react-icons/fi'
// components
import GoBack from '../../components/shared/GoBack'
// styles
import styles from '../../styles/pages/editProfile.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const EditProfile: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { push } = useRouter()
    const { User, isLoading, isAuthenticated } = useAppSelector(userSelector)
    const [toggleChooseProfilePic, setToggleChooseProfilePic] = useState(false)
    const [data, setData] = useState<FormUserType>({
        Email: User.Email,
        Fname: User.Fname,
        Sname: User.Sname,
        Profile_Pic: User.Profile_Pic,
        Region: User.Region,
        Username: User.Username
    })
    // handlers
    const updateUserHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await dispatch(userActions.updateUser(updateUserInputHandler(User, data)))
        }
        catch (err) {
            dispatch(uiActions.pushFeedback({status: false, msg: err.message}))
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
            {/* go back */}
            <GoBack />
            <form className={styles["EditProfile-form"]} onSubmit={updateUserHandler}>
                {/* profile pic */}
                <div className={styles["input-img-container"]}>
                    {/* choose profile-pic */}
                    <div className={getStyles(`choose-profile-pic ${toggleChooseProfilePic ? 'show' : ''}`)}>
                        {Array.apply(null, Array(10)).map((v,i: number) => 
                            <img key={i} src={PUBLIC_SRC.PROFILE_PIC(i)} alt={`${i}`} onClick={() => {
                                setData({...data, Profile_Pic: i})
                                setToggleChooseProfilePic(false)
                            }} style={{
                                transitionDelay: `${i*.04}s`,
                                transform: `translate(-3.4rem, ${i*-1}rem)`
                            }}/>)}
                    </div>
                    <img src={PUBLIC_SRC.PROFILE_PIC(data.Profile_Pic)} alt="Profile Picture" />
                    <div className={styles["change-profile-pic-btn"]} title="Change profile picture">
                        <FiEdit2 size={20} className={styles['icon']} onClick={() => setToggleChooseProfilePic(s =>!s)} />
                    </div>
                </div>
                <div className={styles["form-body"]}>
                    {/* fname & sname */}
                    <div className={styles["input-name-text-container"]}>
                        <div className={styles["input-text-container"]}>
                            <label htmlFor="fname">First name</label>
                            <input type="text" name='Fname' id='fname' 
                                defaultValue={User.Fname} onChange={e => setData({...data, Fname: e.target.value})} />
                        </div>
                        <div className={styles["input-text-container"]}>
                            <label htmlFor="fname">Last name</label>
                            <input type="text" name='Sname' id='sname' 
                                defaultValue={User.Sname} onChange={e => setData({...data, Sname: e.target.value})} />
                        </div>
                    </div>
                    {/* username */}
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name='Username' id='username' 
                            defaultValue={User.Username} onChange={e => setData({...data, Username: e.target.value})} />
                    </div>
                    {/* email */}
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='Email' id='email' 
                            defaultValue={User.Email} onChange={e => setData({...data, Email: e.target.value})} />
                    </div>
                    {/* region */}
                    <div className={styles["input-text-container"]}>
                        <label htmlFor="Region">Region</label>
                        <select name="Region" id="region" defaultValue={User.Region} 
                            onChange={e => setData({...data, Region: e.target.value as keyof typeof REGIONS_ENUM})}>
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