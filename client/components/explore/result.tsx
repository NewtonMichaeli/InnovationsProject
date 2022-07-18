// types
import Link from "next/link"
import { FC } from "react"
import { CLIENT_URIS } from "../../configs/_client"
import { MinifiedUserType } from "../../redux/features/user/user.types"
// styles
import styles from '../../styles/components/explore/userResult.module.css'


const UserResult: FC<{
    data: MinifiedUserType
}> = ({data}) => {

    return (
        <Link href={CLIENT_URIS._USER(data.Username)}>
            <div className={styles["result-user"]}>
                <div className={styles["profile-pic"]}>
                    <img src={`/profile-pics/${data.Profile_Pic}.jpeg`} alt={data.Username} />
                </div>
                <div className={styles["user-data"]}>
                    <h2 className={styles['name']}>{data.Fname} {data.Sname}</h2>
                    <h5 className={styles['username-x-email']}>{data.Username}&nbsp;•&nbsp;{data.Email}</h5>
                </div>
            </div>
        </Link>
    )
}

export default UserResult