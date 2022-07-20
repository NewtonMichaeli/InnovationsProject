import Head from 'next/head'
import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
import { SharedProjectsResponseType } from '../../redux/features/user/user.types'
// components
import Project from '../../components/my-projects/Project'
// styles
import styles from '../../styles/pages/myProjects.module.css'


const Index: FC = () => {

    // states
    const { User } = useAppSelector(userSelector)
    const inventions: SharedProjectsResponseType[] = User ? [
        ...User.Inventions.map(inv => ({CreatorData: {Username: User.Username, _id: User._id, Profile_Pic: User.Profile_Pic}, Project: inv})),
        ...User.Shared_Projects
    ] : []
    console.log('invs: ', inventions)

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
                {
                    !inventions?.length
                        ? <code className={styles["no-inventions"]}>You have no Inventions yet</code>
                        : inventions.map((inv, i) => 
                            <Project isCreator={inv.CreatorData._id === User._id} key={i} invention={inv} />)
                }
            </div>
        </main>
    )
}

export default Index
