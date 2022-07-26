// types
import { FC } from 'react'
import { INVENTION_USER_ROLES } from '../../../configs/_client'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { inventionSelector } from '../../../redux/features/invention'
// styles
import styles from '../../../styles/components/InventionsDataSection/aboutyou.module.css'


const AboutYouSection: FC = () => {
    // states
    const { InventionUserRole } = useAppSelector(inventionSelector)
    const roles = ['DevOps', 'UI/X', 'Database Maintainance', 'Design Manager', 'Design']

    {/* show if either creator or contributor */}
    if (InventionUserRole !== INVENTION_USER_ROLES.OBSERVER) return (
        <section className={styles["aboutyou-section"]}>
            <div className={styles["section-header"]}>
                <h3>About you</h3>
            </div>
            <div className={styles["content"]}>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>You are:</h5>
                    <h3 className={styles['data-text']}>
                        {InventionUserRole === INVENTION_USER_ROLES.CREATOR ? 'Creator' : 'Contributor'}
                    </h3>
                </div>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Roles:</h5>
                    {/* {Invention.Project.Roles.length */}
                    {roles.length
                        ? <h3 className={styles['list']}>{roles.map((r,i) => <code key={i}>{r}</code>)}</h3>
                        : <h3 className={styles['data']}>None</h3>
                    }
                </div>
            </div>
        </section>
    )
    else return <></>
}

export default AboutYouSection