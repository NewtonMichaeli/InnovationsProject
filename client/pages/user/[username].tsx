import Head from 'next/head'
import {FC, useState} from 'react'
// types
import { UserPageProps, UserPageSSR } from '../../types/pages/user.type'
import { CLIENT_URIS, SRC_PROFILE_PIC } from '../../configs/_client'
// redux
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// utils
import { fetchUserData } from '../../utils/api/requests/user.api'
import { AUTH_TOKEN, tokenHeader } from '../../configs/_token'
// components
import GoBack from '../../components/shared/GoBack'
import { followHandlerType, inviteToProjectHandlerType, SocialButtons } from '../../components/shared/UsersList'
import DataLists from '../../components/shared/user-data-lists'
// styles
import styles from '../../styles/pages/user.module.css'
import { SharedProjectsResponseType } from '../../redux/features/user/user.types'


/**
 * @_DONE fix "following while not logged in" behavior, seperate util functionallity for adding/removing follower
 * Component is prerendered with the requested user-data.
 * @param UserData (typeof UserType)
 * @returns User-JSX for user page
 */
const User: FC<UserPageProps> = ({UserData}) => {
    // States
    const [InspectedUser, setInspectedUser] = useState(UserData)
    const { User, isAuthenticated } = useAppSelector(userSelector)

    // Handlers
    // -- follow handler - handle follow button when clicked
    const followHandler: followHandlerType = (action: 'add' | 'remove') => {
        if (!isAuthenticated) return alert('Not logged in!')    // -- temp notification system
        // -- update InspectedUser (temp functionality)
        if (action === 'add') setInspectedUser(iu => ({...iu, Followers: [...iu.Followers, User]}))
        else setInspectedUser(iu => ({...iu, Followers: iu.Followers.filter(f => f._id !== User._id)}))
    }
    // -- invite-to-project handler - handle when inviting to project
    const inviteToProjectHandler: inviteToProjectHandlerType = (project_id: string) => {
        if (!isAuthenticated) return alert('Not logged in!')    // -- temp notification system
        // -- update InspectedUser (temp functionality)
        setInspectedUser(iu => ({
            ...iu,
            Shared_Projects: [
                ...iu.Shared_Projects,
                {
                    CreatorData: {_id: User._id, Profile_Pic: User.Profile_Pic, Username: User.Username},
                    Project: User.Inventions.find(inv => inv._id === project_id)
                }
            ]
        }))
    }
    

    return (
        <main className={styles["User"]}>
            <Head>
                <title>{InspectedUser.Username} - Innovation</title>
            </Head>
            {/* go-back button */}
            <GoBack />
            {/* user header section */}
            <section className={styles["user-header"]}>
                <img src={SRC_PROFILE_PIC(InspectedUser.Profile_Pic)} alt={InspectedUser.Username} />
                <h1 className={styles['fullname']}>{InspectedUser.Fname} {InspectedUser.Sname}</h1>
                <h4 className={styles["username-x-email"]}>{InspectedUser.Username}&nbsp;•&nbsp;{InspectedUser.Email}</h4>
                <SocialButtons 
                    invitingUser={InspectedUser._id} 
                    setInvitingUser={null} 
                    target_user_id={InspectedUser._id} 
                    isFollowing={User?.Following.some(f => f._id === InspectedUser._id)} 
                    singleUserModeCB={[followHandler, inviteToProjectHandler]} />
            </section>
            {/* user data section */}
            <DataLists User={InspectedUser} />
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