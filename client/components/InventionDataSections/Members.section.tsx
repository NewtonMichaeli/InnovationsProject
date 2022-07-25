// types
import { FC } from 'react'
import { ContributorType } from '../../redux/features/user/user.types'
// redux
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// components
import UserItem from '../shared/UserItem'
// styles
import styles from '../../styles/components/InventionsDataSection/members.module.css'


const MembersSection: FC<{
    Members: ContributorType[]
}> = ({Members}) => {
    // states
    const { User } = useAppSelector(userSelector)

    if (User) return (
        <section className={styles["members-section"]}>
            <div className={styles["section-header"]}>
                <h3>Members:</h3>
            </div>
            <div className={styles["content"]}>
                <code className={styles['counter-title']}>{Members.length} Member{Members.length!==1?'s':''}</code>
                {Members.map(m => 
                    <UserItem key={m._id} User={m} isFollowing={User.Following.some(f => f._id === m._id)} isSelf={User._id === m._id} isAuthenticated />)}
            </div>
        </section>
    )
    else return <></>
}

export default MembersSection