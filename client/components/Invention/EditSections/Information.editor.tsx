import Head from 'next/head'
// types
import { FC } from 'react'
// utils
import formatTime from '../../../utils/others/formatTime'
// redux
import { inventionSelector } from '../../../redux/features/invention'
import { useAppSelector } from '../../../hooks/redux'
// styles
import styles from '../../../styles/components/Invention/EditSections/information.module.css'


const Information_EditSection: FC = () => {
    // states
    const { Project: Invention } = useAppSelector(inventionSelector).Invention

    return (
        <section className={styles["information-section"]}>
            <Head>
                {/* <title>Editing {Invention.Name}'s Information - Innovation</title> */}
            </Head>
            <div className={styles["editor-header"]}>
                <h1 className={styles["title"]}>{Invention.Name}</h1>
            </div>
            <div className={styles["data-group"]}>
                <h5 className={styles['label']}>Project Name:</h5>
                <input type="text" id='Name' name='Name' defaultValue={Invention.Name} />
            </div>
            <div className={styles["data-group"]}>
                <h5 className={styles['label']}>Date of creation:</h5>
                <h3 className={styles['data']}>{formatTime(Invention.DoC)}</h3>
            </div>
            <div className={styles["data-group"]}>
                <h5 className={styles['label']}>Description:</h5>
                <textarea name="Description" id="Description" cols={30} rows={10}>
                    {Invention.Description}
                </textarea>
            </div>
            <div className={styles["data-group"]}>
                <h5 className={styles['label']}>Is Private</h5>
                <button>{Invention.Private ? 'true' : 'false'}</button>
            </div>
            <div className={styles["data-group"]}>
                <h5 className={styles['label']}>Status</h5>
                <select name="Status" id="Status" defaultValue={Invention.Status}>
                    
                </select>
            </div>
            <div className={styles["data-group"]}>
                <h5 className={styles['label']}>Members</h5>
                <h3 className={styles['data']}>{Invention.Contributors.length + 1}</h3>
            </div>
        </section>
    )
}

export default Information_EditSection