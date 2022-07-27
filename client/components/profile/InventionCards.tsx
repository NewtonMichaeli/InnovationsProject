import Link from 'next/link'
// types
import {FC} from 'react'
import { CLIENT_URIS } from '../../configs/_client'
import { InventionType } from '../../redux/features/user/user.types'
// utils
import formatTime from '../../utils/others/formatTime'
// styles
import styles from '../../styles/components/profile/inventions/Cards.module.css'


const Card: FC<{
    Invention: InventionType
}> = ({Invention}) => {
    return (
        <Link href={CLIENT_URIS._INVENTION(Invention._id)}>
            <div className={styles["Card"]}>
                <h3 className={styles["Name"]}>{Invention.Name}</h3>
                <h3 className={styles["DoC"]}>{formatTime(Invention.DoC)}</h3>
                <h3 className={styles["Members"]}>{Invention.Contributors.length}</h3>
                <h3 className={styles["Description"]}>{Invention.Description}</h3>
            </div>
        </Link>
    )
}


/**
 * @param UserData (typeof InventionType[])
 * @returns JSX component for rendering inventions as cards
 */
const InventionCards: FC<{
    Inventions: InventionType[]
}> = ({Inventions}) => {

    return (
        <div className={styles["InventionCards"]}>
            {
                Inventions.length
                    ? Inventions.map(inv => <Card key={inv._id} Invention={inv} />)
                    : <code className={styles["empty-list"]}>No inventions yet</code>
            }
        </div>
    )
}

export default InventionCards