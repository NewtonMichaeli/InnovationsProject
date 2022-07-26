// types
import { FC } from 'react'
import { INVENTION_USER_ROLES } from '../../../configs/_client'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { userSelector } from '../../../redux/features/user'
import { inventionSelector } from '../../../redux/features/invention'
// components
import UserItem from '../../shared/UserItem'
import EditSectionBtn from '../../shared/EditInventionSection'
// styles
import styles from '../../../styles/components/InventionsDataSection/members.module.css'


const MembersSection: FC = () => {
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
                {Invention.Project.Contributors.map(m => 
                    <UserItem key={m._id} User={m} isFollowing={User.Following.some(f => f._id === m._id)} isSelf={User._id === m._id} isAuthenticated />)}
            </div>
        </section>
    )
}

export default MembersSection