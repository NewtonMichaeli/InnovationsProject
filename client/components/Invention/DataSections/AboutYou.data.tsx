// types
import { FC } from 'react'
import { INVENTION_USER_ROLES } from '../../../configs/_client'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { inventionSelector } from '../../../redux/features/invention'
import { userSelector } from '../../../redux/features/user'
// components
import EditSectionBtn from '../../shared/EditInventionSection'
// styles
import styles from '../../../styles/components/Invention/DataSections/aboutyou.module.css'


const AboutYou_DataSection: FC = () => {
    // states
    const { User } = useAppSelector(userSelector)
    const { InventionUserRole, Invention } = useAppSelector(inventionSelector)
    const roles = InventionUserRole === INVENTION_USER_ROLES.CONTRIBUTOR
        ? (Invention?.Project.Contributors.find(({_id}) => _id === User?._id)?.Roles ?? [])     // -- contributor's roles
        : (Invention.Project.Roles ?? [])   // -- creator's roles

    {/* show if either creator or contributor */}
    if (InventionUserRole !== INVENTION_USER_ROLES.OBSERVER) return (
        <section className={styles["aboutyou-section"]}>
            <div className={styles["section-header"]}>
                <h3>About you</h3>
                {/* edit if creator */}
                <EditSectionBtn className={styles["edit"]} section='aboutyou' includeRole={INVENTION_USER_ROLES.CREATOR} />
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

export default AboutYou_DataSection