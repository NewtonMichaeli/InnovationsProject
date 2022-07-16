import { FC } from 'react'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userActions, userSelector } from '../../redux/features/user'
import { ContributorType } from '../../redux/features/user/user.types'
// styles
import styles from '../../styles/components/InventionsDataSection/members.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const Member: FC<{
    member: ContributorType,
    isFollowing: boolean,
    isSelf: boolean
}> = ({member, isFollowing, isSelf}) => {

    // states
    const dispatch = useAppDispatch()
    // handlers
    const handleFollowBtn = () => {
        dispatch(
            userActions.follow({action: isFollowing ? 'remove' : 'add', target_user: member._id})
        )
    }

    return (
        <div className={styles["member-item"]}>
            <section className={styles["profile-pic"]}>
                <img src={`/profile-pics/${member.Profile_Pic}.jpeg`} alt="" />
            </section>
            <section className={styles["user-data"]}>
                <h1 className={styles["name"]}>{member.Fname} {member.Sname}</h1>
                <h3 className={styles["username-x-email"]}>{member.Username} • {member.Email}</h3>
            </section>
            <section className={getStyles(`social-btns ${isSelf ? 'hide-btns':''}`)}>
                <button className={getStyles(`btn-follow ${isFollowing ? 'following':''}`)} title="Follow member" onClick={handleFollowBtn}>
                    Follow{isFollowing ? 'ing' : ''}
                </button>
                <button className={styles["btn-invite-to-project"]} title="Invite to project">Invite to project</button>
            </section>
        </div>
    )
}


const MembersSection: FC<{
    Members: ContributorType[]
}> = ({Members}) => {
    // states
    const { User } = useAppSelector(userSelector)

    return (
        <section className={styles["members-section"]}>
            <div className={styles["section-header"]}>
                <h3>Members:</h3>
            </div>
            <div className={styles["content"]}>
                <code className={styles['counter-title']}>{Members.length} Member{Members.length!==1?'s':''}</code>
                {Members.map(m => 
                    <Member key={m._id} member={m} isFollowing={User.Following.includes(m._id)} isSelf={User._id === m._id} />)}
            </div>
        </section>
    )
}

export default MembersSection