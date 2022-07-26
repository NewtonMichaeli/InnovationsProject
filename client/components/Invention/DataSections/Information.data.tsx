// types
import { FC } from 'react'
import { INVENTION_USER_ROLES } from '../../../configs/_client'
// utils
import formatTime from '../../../utils/others/formatTime'
// redux
import { inventionSelector } from '../../../redux/features/invention'
import { useAppSelector } from '../../../hooks/redux'
// components
import EditSectionBtn from '../../shared/EditInventionSection'
// styles
import styles from '../../../styles/components/Invention/DataSections/information.module.css'


const Information_DataSection: FC = () => {
    // states
    const { Project: Invention } = useAppSelector(inventionSelector).Invention

    return (
        <section className={styles["information-section"]}>
            <div className={styles["section-header"]}>
                <h3>Information</h3>
                {/* edit if either creator or contributor */}
                <EditSectionBtn className={styles["edit"]} section='information' excludeRole={INVENTION_USER_ROLES.OBSERVER} />
            </div>
            <div className={styles["prim-content"]}>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Project Name:</h5>
                    <h3 className={styles['data']}>{Invention.Name}</h3>
                </div>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Date of creation:</h5>
                    <h3 className={styles['data']}>{formatTime(Invention.DoC)}</h3>
                </div>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Description:</h5>
                    <h3 className={styles['data']}>{Invention.Description}</h3>
                </div>
            </div>
            <div className={styles["sec-content"]}>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Is Private</h5>
                    <h3 className={styles['data']}>{Invention.Private ? 'true' : 'false'}</h3>
                </div>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Status</h5>
                    <h3 className={styles['data']}>{Invention.Status}</h3>
                </div>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Members</h5>
                    <h3 className={styles['data']}>{Invention.Contributors.length + 1}</h3>
                </div>
            </div>
        </section>
    )
}

export default Information_DataSection