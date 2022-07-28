import Link from 'next/link'
import Head from 'next/head'
// types
import { FC } from 'react'
import { SharedProjectsResponseType } from '../../redux/features/user/user.types'
import { CLIENT_URIS } from '../../configs/_client'
// redux
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// utils
import { getSharedProjectsFormattedInventions } from '../../utils/inventions.utils'
// components
import RenderProjects from '../../components/shared/Project'
// styles
import styles from '../../styles/pages/myProjects.module.css'


const MyProjects: FC = () => {
    // states
    const { User } = useAppSelector(userSelector)
    const inventions: SharedProjectsResponseType[] = getSharedProjectsFormattedInventions(User)

    return (
        <main className={styles['MyProjects']}>
            <Head>
                <title>My Projects - Innovation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* projects header */}
            <div className={styles["my-projects-header"]}>
                <h1 className={styles['title']}>Projects</h1>
                <Link href={CLIENT_URIS.NEW_PROJECT}>
                    <button className={styles['new-project']}>
                        + New Project
                    </button>
                </Link>
            </div>
            {/* projects list */}
            <RenderProjects Inventions={inventions} />
        </main>
    )
}

export default MyProjects