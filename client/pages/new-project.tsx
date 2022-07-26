import Head from 'next/head'
import { FC, FormEvent, useState } from 'react'
// types
import { FormInventionType } from '../redux/features/user/user.types'
// redux
import { useAppDispatch } from '../hooks/redux'
// components
import List from '../components/new-project/List'
import Status from '../components/new-project/Status'
import Contributors from '../components/new-project/Contributors'
import Private from '../components/new-project/Private'
// styles
import styles from '../styles/pages/newProject.module.css'
import { getModuleStylesMethod } from '../utils/styles.utils'
import { userActions } from '../redux/features/user'
import { newProjectInputHandler } from '../utils/forms/newProject.form'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const NewProject: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const [data, setData] = useState<FormInventionType>({
        Name: '',
        Description: '',
        Status: 'open',
        Private: false,
        Tags: [],
        Occupations: [],
        Contributors: [],
        Roles: []
    })
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            dispatch(userActions.createInvention(newProjectInputHandler(data)))
        }
        catch (err) {
            console.log(err)    // -- temp
        }
    }

    return (
        <main className={styles["NewProject"]}>
            <Head>
                <title>New Project - Innovation</title>
            </Head>
            <div className={styles["content"]}>
                <div className={styles["header"]}>
                    <h1>Create a new Project</h1>
                    <p>Your own invention, where you can plan everything, upload assets and share with others.</p>
                </div>
                <form className={styles["form"]} onSubmit={submitHandler} onKeyDown={e => e.key === "Enter" ? e.preventDefault() : null}>
                    {/* projec name */}
                    <div className={styles["input-field"]}>
                        <label htmlFor="Name">Project Name</label>
                        <input type="text" name='Name' id='Name' onChange={e => setData({...data, Name: e.target.value})} />
                    </div>
                    {/* prject description */}
                    <div className={styles["input-field"]}>
                        <label htmlFor="Description">Project Description</label>
                        <textarea name="Description" id="Description" onChange={e => setData({...data, Description: e.target.value})} />
                    </div>
                    {/* project private indicator */}
                    <div className={styles["input-field"]}>
                        <Private setIsPrivate={(is) => setData({...data, Private: is})} />
                    </div>
                    {/* project status */}
                    <div className={styles["input-field"]}>
                        <label htmlFor="Status">Status</label>
                        <Status status={data.Status} setStatus={val => setData({...data, Status: val})} />
                    </div>
                    {/* project occupations */}
                    <div className={styles["input-field"]}>
                        <label htmlFor="occupation">Project Occupations</label>
                        <List setList={vals => setData({...data, Occupations: vals})} list={data.Occupations} mode="occupation" />
                    </div>
                    {/* project tags */}
                    <div className={getStyles("input-field not-required")}>
                        <label htmlFor="tag">Project Tags</label>
                        <List setList={vals => setData({...data, Tags: vals})} list={data.Tags} mode="tag" />
                    </div>
                    {/* project members */}
                    <div className={getStyles("input-field not-required")}>
                        <label htmlFor="contributor">Project Members</label>
                        <Contributors setList={vals => setData({...data, Contributors: vals})} list={data.Contributors} />
                    </div>
                    {/* submit */}
                    <div className={styles["input-field"]}>
                        <input type="submit" value="Create Invention" />
                    </div>
                </form>
            </div>
        </main>
    )
}

export default NewProject