import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
// types
import {FC} from 'react'
import { CLIENT_URIS, PUBLIC_SRC } from '../../configs/_client'
// redux
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// components
import GoBack from '../../components/shared/GoBack'
import DataLists from '../../components/shared/user-data-lists'
// styles
import styles from '../../styles/pages/profile.module.css'


const Profile: FC = () => {
    // states
    const { User } = useAppSelector(userSelector)
    // -- has redirected from explore page?:
    const { push, query: {explored} } = useRouter()

    return (
        <main className={styles["Profile"]}>
            <Head>
                <title>My Profile - Innovation</title>
            </Head>
            {/* go-back button - appears when redirected from explore page */}
            {explored && <GoBack />}
            {/* edit profile icon button */}
            <Link href={CLIENT_URIS.EDIT_PROFILE}>
                <img className={styles["edit-profile-btn"]} src="/edit-profile.svg" alt="Edit profile" title="Edit profile" />
            </Link>
            {/* profile header section */}
            <section className={styles["profile-header"]}>
                <img src={PUBLIC_SRC.PROFILE_PIC(User.Profile_Pic)} alt={User.Username} />
                <h1 className={styles['fullname']}>{User.Fname} {User.Sname}</h1>
                <h4 className={styles["username-x-email"]}>{User.Username} • {User.Email}</h4>
                <button className={styles["btn-edit-profile"]} onClick={() => push(CLIENT_URIS.EDIT_PROFILE)}>Edit profile</button>
            </section>
            {/* profile data section */}
            <DataLists User={User} />
        </main>
    )
}

export default Profile