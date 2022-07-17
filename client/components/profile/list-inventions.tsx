import {FC, useState} from 'react'
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
// styles
import styles from '../../styles/components/profile/list-inventions.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'
import { InventionType, SharedProjectsResponseType } from '../../redux/features/user/user.types'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const InventionItem: FC<{
    Invention: InventionType | SharedProjectsResponseType
}> = ({Invention}) => {

    if ('CreatorData' in Invention) return (
        <div className={styles["InventionItem"]}>
            {Invention.Project.Name}
        </div>
    )
    else return (
        <div className={styles["InventionItem"]}>
            {Invention.Name}
        </div>
    )
}


const ListInventions: FC<{
    show: boolean,
    close: () => unknown
}> = ({show, close}) => {
    // states
    const { User } = useAppSelector(userSelector)
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
            User.Username.toLowerCase().includes(search) ||
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
                <div className={styles["content"]}>
                    <div className={styles["content-header"]}>
                        <div className={styles["profile-pic"]} onClick={onClose} title="Leave Inventions tab">
                            <BsArrowLeftShort size={36} />
                            <img src={`/profile-pics/${User.Profile_Pic}.jpeg`} alt={User.Username} />
                        </div>
                        <div className={styles['input-search-inventions']}>
                            <AiOutlineSearch className={styles['icon-search']} size={18} />
                            <input type="text" placeholder={`Search inventions (${User.Inventions.length})`} 
                                onChange={({target}) => changeSearch(target.value.toLowerCase())} />
                        </div>
                    </div>
                    <div className={styles["content-inventions-list"]}>
                        <h4 className={styles["content-inventions-list-title"]}>Personal projects:</h4>
                        {User.Inventions.filter(filterInventions).map(inv => <InventionItem key={inv._id} Invention={inv} />)}
                        <h4 className={styles["content-inventions-list-title"]}>Shared projects:</h4>
                        {User.Shared_Projects.filter(filterInventions).map(inv => <InventionItem key={inv.Project._id} Invention={inv} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListInventions
