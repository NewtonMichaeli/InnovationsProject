import { FC, useState } from "react"
import { AiOutlineMenu } from 'react-icons/ai'
// redux
import { useAppSelector } from "../../../hooks/redux"
import { userSelector } from "../../../redux/features/user"
// components
import MenuLinks from './MenuLinks'
// styles
import styles from '../../../styles/components/layout/menu.module.css'
import { getModuleStylesMethod } from "../../../utils/styles.utils"

// get multiple styles method
const getStyles = getModuleStylesMethod(styles)


/**
 * @returns a rendered menu-bar, sitting at the left side of the layout section
 */
const Menu: FC = () => {

    // States
    const [isMenuExpanded, setIsMenuExpanded] = useState(false)
    const { isLoading } = useAppSelector(userSelector)
    // Handlers
    const expandMenuHandler = () => {
        if (!isLoading) {
            // -- control menu-width-variable with the <isMenuExpanded> state
            window.document.documentElement.style
                .setProperty('--menu-width', !isMenuExpanded ? '18rem' : '5.5rem')
            setIsMenuExpanded(!isMenuExpanded)
        }
    }
    
    return (
        <div className={getStyles(`Menu ${isMenuExpanded ? '' : 'menu-closed'}`)}>
            <div className={styles["menu-header"]}>
                <h4 className={styles["menu-title"]}>Menu</h4>
                <AiOutlineMenu className={styles["menu-icon"]} size={32} onClick={expandMenuHandler} />
            </div>
            {/* links */}
            <MenuLinks />
        </div>
    )
}

export default Menu