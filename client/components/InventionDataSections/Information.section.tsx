import { FC } from 'react'
import { InventionType } from '../../redux/features/user/user.types'
import formatTime from '../../utils/others/formatTime'
// icons
import { FiEdit3 } from 'react-icons/fi'
// styles
import styles from '../../styles/components/InventionsDataSection/information.module.css'


const InformationSection: FC<{
    Invention: InventionType
}> = ({Invention}) => {

    return (
        <section className={styles["information-section"]}>
            <div className={styles["section-header"]}>
                <h3>Information</h3>
                <FiEdit3 className={styles['edit']} size={20} />
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

export default InformationSection
