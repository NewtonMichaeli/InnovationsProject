import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, FormEvent, useState } from 'react'
// types
import { FormInventionType } from '../../../types/data/invention.types'
import { CLIENT_URIS } from '../../../configs/_client'
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { userActions } from '../../../redux/features/user'
// utils
import { newProjectInputHandler } from '../../../utils/forms/newProject.form'
// components
import Private from '../../new-project/Private'
import Status from '../../new-project/Status'
import List from '../../new-project/List'
// styles
import styles from '../../../styles/pages/newProject.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)

const Information_EditSection: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { push } = useRouter()
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
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await dispatch(userActions.createInvention(newProjectInputHandler(data)))
            push(CLIENT_URIS.DASHBOARD, null, {shallow: true})
        }
        catch (err) {
            console.log(err)    // -- temp
        }
    }

    return (
        <section className={styles["NewProject"]}>
            <Head>
                {/* <title>Edit Information - Innovation</title> */}
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
                    {/* submit */}
                    <div className={styles["input-field"]}>
                        <input type="submit" value="Create Invention" />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Information_EditSection