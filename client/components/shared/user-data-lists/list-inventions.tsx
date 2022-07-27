import {FC, useState} from 'react'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { userSelector } from '../../../redux/features/user'
// types
import { InventionType, SharedProjectsResponseType, UserType } from '../../../redux/features/user/user.types'
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
// components
import GoBack from '../GoBack'
import InventionCards from '../../profile/InventionCards'
// styles
import styles from '../../../styles/components/profile/list-inventions.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const ListInventions: FC<{
    show: boolean,
    UserData: UserType,
    close: () => unknown
}> = ({show, close, UserData}) => {
    // states
    const [search, changeSearch] = useState('')
    // handlers
    const onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        close()
    }
    const filterInventions = (invention: InventionType | SharedProjectsResponseType) => {
        if ('CreatorData' in invention) return (
            invention.CreatorData.Username.toLowerCase().includes(search) ||
            invention.Project.Name.toLowerCase().includes(search) ||
            invention.Project.Tags.some(t => t.toLowerCase().includes(search))
        )
        else return (
            UserData.Username.toLowerCase().includes(search) ||
            invention.Name.toLowerCase().includes(search) ||
            invention.Tags.some(t => t.toLowerCase().includes(search))
        )
    }

    return (
        // wrapper - has no dimensions, referencing parent position for clip-path property
        <div className={getStyles(`list-inventions-wrapper ${show ? 'show':''}`)}>
            {/* absolute container frame */}
            <div className={styles["list-inventions"]}>
                {/* content inside container */}
                <GoBack onClick={onClose} />
                <div className={styles["content"]}>
                    {/* inventions */}
                    <section className={styles["inventions"]}>
                        <div className={styles["section-header"]}>
                            <div className={styles["title"]}>
                                <img src={`/profile-pics/${UserData.Profile_Pic}.jpeg`} alt={UserData.Username} />
                                <h2 className={styles["username"]}>{UserData.Username}'s Inventions</h2>
                            </div>
                            <code className={styles["select-show-as"]}>Cards</code>
                        </div>
                        {/* render inventions as cards */}
                        <InventionCards Inventions={UserData.Inventions} />
                    </section>
                    {/* shared projects */}
                    <section className={styles["shared-inventions"]}>
                        <div className={styles["section-header"]}>
                            <div className={styles["title"]}>
                                <img src={`/profile-pics/${UserData.Profile_Pic}.jpeg`} alt={UserData.Username} />
                                <h2 className={styles["username"]}>{UserData.Username}'s Shared Inventions</h2>
                            </div>
                            <code className={styles["select-show-as"]}>Cards</code>
                        </div>
                        {/* render inventions as cards */}
                        <InventionCards Inventions={UserData.Shared_Projects.map(inv => inv.Project)} />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ListInventions
