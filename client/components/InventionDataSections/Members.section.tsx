import { FC } from 'react'
import { ContributorType } from '../../redux/features/user/user.types'
// styles
import styles from '../../styles/components/InventionsDataSection/members.module.css'


const MembersSection: FC<{
    Members: {
        Username: string,
        Email: string,
        Profile_Pic: number,
        user_id: string
    }
}> = ({Members}) => {

    return (
        <section className={styles["members-section"]}>
            <div className={styles["section-header"]}>
                <h3>Teammates:</h3>
            </div>
            <div className={styles["content"]}>
                
            </div>
        </section>
    )
}

export default MembersSection