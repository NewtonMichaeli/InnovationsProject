// types
import { FC } from 'react'
import { INVENTION_USER_ROLES } from '../../../configs/_client'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { userSelector } from '../../../redux/features/user'
import { inventionSelector } from '../../../redux/features/invention'
// components
import UsersList from '../../shared/UsersList'
import EditSectionBtn from '../../shared/EditInventionSection'
// styles
import styles from '../../../styles/components/Invention/EditSections/members.module.css'


const Members_EditSection: FC = () => {
    // states
    const { User } = useAppSelector(userSelector)
    const { Invention } = useAppSelector(inventionSelector)

    return (
        <section className={styles["members-section"]}>
            <div className={styles["section-header"]}>
                <h3>Members:</h3>
                {/* edit if creator */}
                <EditSectionBtn className={styles["edit"]} section='members' includeRole={INVENTION_USER_ROLES.CREATOR} />
            </div>
            <div className={styles["content"]}>
                <code className={styles['counter-title']}>
                    {Invention.Project.Contributors.length} Member{Invention.Project.Contributors.length!==1?'s':''}
                </code>
                <UsersList isFollowing={mid => User.Following.some(f => f._id === mid)} 
                    Users={Invention.Project.Contributors} 
                    isSelf={fid => User._id === fid} />
            </div>
        </section>
    )
}

export default Members_EditSection