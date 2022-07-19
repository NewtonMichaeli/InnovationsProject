import {FC, useState} from 'react'
// types
import { UserPageProps, UserPageSSR } from '../../types/pages/user.type'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userActions, userSelector } from '../../redux/features/user'
// utils
import { fetchUserData } from '../../utils/api/requests/user.api'
// components
import Head from 'next/head'
import ListFollowers from '../../components/profile/list-followers'
import ListInventions from '../../components/profile/list-inventions'
import ListFollowings from '../../components/profile/list-following'
// styles
import styles from '../../styles/pages/user.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'
import { CLIENT_URIS } from '../../configs/_client'
import { AUTH_TOKEN, tokenHeader } from '../../configs/_headers'
import GoBack from '../../components/shared/GoBack'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


/**
 * @TODO fix "following while not logged in" behavior, seperate util functionallity for adding/removing follower
 * Component is prerendered with the requested user-data.
 * @param UserData (typeof UserType)
 * @returns User-JSX for user page
 */
const User: FC<UserPageProps> = ({UserData}) => {
    // states
    const dispatch = useAppDispatch()
    const defaulDataShowStatus = {followers: false, inventions: false, following: false}
    // data
    const { User, isAuthenticated } = useAppSelector(userSelector)
    const isFollowing = isAuthenticated && User.Following.some(f => f._id === UserData._id)
    // -- display status for each data item - default is false
    const [showDataItem, setShowDataItem] = useState({...defaulDataShowStatus})
    // handlers
    const changeShowDataItem = (type: keyof typeof showDataItem, status: boolean) => {
        // -- shorthand for controlling a single key each time
        // -- show/hide specified data-item-key while allowing for only 1 key to be true
        setShowDataItem({ ...defaulDataShowStatus, [type]: status })
    }
    const handleFollowBtn = () => {
        if (!isAuthenticated) alert('Not logged in!')    // -- temp notification system
        const action = isFollowing ? 'remove' : 'add'
        dispatch(userActions.follow({action, target_user: UserData._id}))
        // -- update UserData (temp functionality)
        if (action === 'add') UserData.Followers.push(User)
        else UserData.Followers = UserData.Followers.filter(f => f._id !== User._id)
    }    

    return (
        <main className={styles["User"]}>
            <Head>
                <title>{UserData.Username} - Innovation</title>
            </Head>
            {/* go-back button */}
            <GoBack />
            {/* user header section */}
            <section className={styles["user-header"]}>
                <img src={`/profile-pics/${UserData.Profile_Pic}.jpeg`} alt={UserData.Username} />
                <h1 className={styles['fullname']}>{UserData.Fname} {UserData.Sname}</h1>
                <h4 className={styles["username-x-email"]}>{UserData.Username} • {UserData.Email}</h4>
                <div className={styles["social-btns"]}>
                    <button className={getStyles(`btn-follow ${isFollowing ? 'following':''}`)} onClick={handleFollowBtn}>
                        Follow{isFollowing?'ing':''}
                    </button>
                    <button className={styles["btn-invite-to-project"]}>Invite to project</button>
                </div>
            </section>
            {/* user data section */}
            <section className={styles["user-data"]}>
                <div className={styles["data-item"]} onClick={() => changeShowDataItem('followers', true)}>
                    <h1>{UserData.Followers.length}</h1>
                    <ListFollowers show={showDataItem.followers} close={() => changeShowDataItem('followers', false)} UserData={UserData} />
                    <h5>Followers</h5>
                </div>
                <div className={styles["data-item"]} onClick={() => changeShowDataItem('inventions', true)}>
                    <h1>{UserData.Inventions.length + UserData.Shared_Projects.length}</h1>
                    <ListInventions show={showDataItem.inventions} close={() => changeShowDataItem('inventions', false)} UserData={UserData} />
                    <h5>Inventions</h5>
                </div>
                <div className={styles["data-item"]} onClick={() => changeShowDataItem('following', true)}>
                    <h1>{UserData.Following.length}</h1>
                    <ListFollowings show={showDataItem.following} close={() => changeShowDataItem('following', false)} UserData={UserData} />
                    <h5>Following</h5>
                </div>
            </section>
        </main>
    )
}


// SSR: Fetch user data before loading page
export const getServerSideProps: UserPageSSR = async context => {
    // get user data
    const username = context.params['username'] as string

    if (username) {
        try {
            const res = await fetchUserData(
                {username}, 
                tokenHeader(context.req.cookies[AUTH_TOKEN])
            )
            // -- user requests it's own data - redirect to profile
            if (res.isSameUser) return {
                props: {UserData: null},
                redirect: {destination: CLIENT_URIS.PROFILE_REDIRECTED_FROM_EXPLORE_PAGE}
            }
            else return {
                props: {UserData: res.data}
            }
        }
        catch (err) {
            return {notFound: true}
        }
    }
    else return {notFound: true}
}


export default User