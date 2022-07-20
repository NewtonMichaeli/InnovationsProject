import Head from 'next/head'
// types
import { FC } from 'react'
import { SharedProjectsResponseType } from '../../redux/features/user/user.types'
// redux
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// utils
import { getSharedProjectsFormattedInventions } from '../../utils/inventions.utils'
// components
import Project from '../../components/my-projects/Project'
// styles
import styles from '../../styles/pages/myProjects.module.css'


const Index: FC = () => {

    // states
    const { User } = useAppSelector(userSelector)
    const inventions: SharedProjectsResponseType[] = getSharedProjectsFormattedInventions(User)
    // components
    const RenderInventions: FC = () => !inventions?.length
        ? <code className={styles["no-inventions"]}>You have no Inventions yet</code>
        : <>{ inventions.map((inv, i) => 
            <Project isCreator={inv.CreatorData._id === User._id} key={i} invention={inv} />) }</>

    return (
        <main className={styles['MyProjects']}>
            <Head>
                <title>My Projects - Innovation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* projects header */}
            <div className={styles["my-projects-header"]}>
                <h1 className={styles['title']}>Projects</h1>
                <button className={styles['new-project']}>
                    + New Project
                </button>
            </div>
            {/* projects list */}
            <div className={styles["my-projects-list"]}>
                <RenderInventions />
            </div>
        </main>
    )
}

export default Index
