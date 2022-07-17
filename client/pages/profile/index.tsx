import {FC, useState} from 'react'
// redux
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// components
import ListFollowers from '../../components/profile/list-followers'
// styles
import styles from '../../styles/pages/profile.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'
import ListInventions from '../../components/profile/list-inventions'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const Profile: FC = () => {
    // states
    const { User } = useAppSelector(userSelector)
    const defaulDatatShowStatus = {followers: false, inventions: false, following: false}
    // display status for each data item - default is false
    const [showDataItem, setShowDataItem] = useState({...defaulDatatShowStatus})
    // handlers
    const changeShowDataItem = (type: keyof typeof showDataItem, status: boolean) => {
        // shorthand for controlling a single key each time
        // show/hide specified data-item-key while allowing for only 1 key to be true
        console.log({ ...defaulDatatShowStatus, [type]: status })
        setShowDataItem({ ...defaulDatatShowStatus, [type]: status })
    }

    return (
        <div className={styles["Profile"]}>
            {/* profile header section */}
            <section className={styles["profile-header"]}>
                <img src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt={User.Username} />
                <h1 className={styles['fullname']}>{User.Fname} {User.Sname}</h1>
                <h4 className={styles["username-x-email"]}>{User.Username} • {User.Email}</h4>
                <button className={styles["btn-edit-profile"]}>Edit profile</button>
            </section>
            {/* profile data section */}
            <section className={styles["user-data"]}>
                <div className={styles["data-item"]} onClick={() => changeShowDataItem('followers', true)}>
                    <h1>{User.Followers.length}</h1>
                    <ListFollowers show={showDataItem.followers} close={() => changeShowDataItem('followers', false)} />
                    <h5>Followers</h5>
                </div>
                <div className={styles["data-item"]} onClick={() => changeShowDataItem('inventions', true)}>
                    <h1>{User.Inventions.length + User.Shared_Projects.length}</h1>
                    <ListInventions show={showDataItem.inventions} close={() => changeShowDataItem('inventions', false)} />
                    <h5>Inventions</h5>
                </div>
                <div className={styles["data-item"]}>
                    <h1>{User.Following.length}</h1>
                    <h5>Following</h5>
                </div>
            </section>
        </div>
    )
}

export default Profile