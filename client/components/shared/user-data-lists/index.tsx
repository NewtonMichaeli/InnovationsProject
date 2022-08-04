import {FC, useState} from 'react'
// types
import { UserType } from '../../../types/data/user.types'
// components
import ListFollowers from './list-followers'
import ListFollowings from './list-following'
import ListInventions from './list-inventions'
// styles
import styles from '../../../styles/components/shared/user-data-lists/index.module.css'


// display status for each data item - default is false
const defaulDataShowStatus = {followers: false, inventions: false, following: false}

const DataLists: FC<{
    User: UserType
}> = ({User}) => {
    // states
    const [showDataItem, setShowDataItem] = useState({...defaulDataShowStatus})
    // handlers
    const changeShowDataItem = (type: keyof typeof showDataItem, status: boolean) => {
        // shorthand for controlling a single key each time
        // show/hide specified data-item-key while allowing for only 1 key to be true
        setShowDataItem({ ...defaulDataShowStatus, [type]: status })
    }
    
    return (
        <section className={styles["user-data"]}>
            <div className={styles["data-item"]} onClick={() => changeShowDataItem('followers', true)}>
                <h1>{User.Followers.length}</h1>
                <ListFollowers show={showDataItem.followers} close={() => changeShowDataItem('followers', false)} UserData={User} />
                <h5>Followers</h5>
            </div>
            <div className={styles["data-item"]} onClick={() => changeShowDataItem('inventions', true)}>
                <h1>{User.Inventions.length + User.Shared_Projects.length}</h1>
                <ListInventions show={showDataItem.inventions} close={() => changeShowDataItem('inventions', false)} UserData={User} />
                <h5>Inventions</h5>
            </div>
            <div className={styles["data-item"]} onClick={() => changeShowDataItem('following', true)}>
                <h1>{User.Following.length}</h1>
                <ListFollowings show={showDataItem.following} close={() => changeShowDataItem('following', false)} UserData={User} />
                <h5>Following</h5>
            </div>
        </section>
    )
}

export default DataLists