import Head from 'next/head'
import { FC, FormEvent, useState } from 'react'
// types
import { FormInventionType } from '../../../types/data/invention.types'
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { inventionActions } from '../../../redux/features/invention'
import { inventionSelector } from '../../../redux/features/invention'
// utils
import { updateInventionInputHandler } from '../../../utils/forms/updateInvention.form'
// components
import Private from '../../new-project/Private'
import Status from '../../new-project/Status'
import List from '../../new-project/List'
import GoBack from '../../shared/GoBack'
// styles
import styles from '../../../styles/components/Invention/EditSections/information.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)

const Information_EditSection: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { Invention } = useAppSelector(inventionSelector)
    const [data, setData] = useState<FormInventionType>({
        Name: Invention.Project.Name,
        Description: Invention.Project.Description,
        Status: Invention.Project.Status,
        Private: Invention.Project.Private,
        Tags: Invention.Project.Tags,
        Occupations: Invention.Project.Occupations,
        Contributors: Invention.Project.Contributors,
        Roles: Invention.Project.Roles
    })
    console.log('1: ', data)
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await dispatch(inventionActions.updateInvention(updateInventionInputHandler(data, Invention.Project._id)))
        }
        catch (err) {
            console.log(err)    // -- temp
        }
    }

    return (
        <section className={styles["Information"]}>
            <Head>
                {/* <title>Information - Innovation</title> */}
            </Head>
            {/* go-back */}
            <GoBack />
            <div className={styles["content"]}>
                <div className={styles["header"]}>
                    <h1>Edit "{Invention.Project.Name}" information</h1>
                    <p>Your own invention, where you can plan everything, upload assets and share with others.</p>
                </div>
                <form className={styles["form"]} onSubmit={submitHandler} onKeyDown={e => e.key === "Enter" ? e.preventDefault() : null}>
                    {/* projec name */}
                    <div className={styles["input-field"]}>
                        <label htmlFor="Name">Project Name</label>
                        <input type="text" name='Name' id='Name' defaultValue={data.Name} onChange={e => setData({...data, Name: e.target.value})} />
                    </div>
                    {/* prject description */}
                    <div className={styles["input-field"]}>
                        <label htmlFor="Description">Project Description</label>
                        <textarea name="Description" id="Description" defaultValue={data.Description} onChange={e => setData({...data, Description: e.target.value})} />
                    </div>
                    {/* project private indicator */}
                    <div className={styles["input-field"]}>
                        <Private setIsPrivate={(is) => setData({...data, Private: is})} isPrivate={data.Private} />
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
                        <input type="submit" value="Save Changes" />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Information_EditSection