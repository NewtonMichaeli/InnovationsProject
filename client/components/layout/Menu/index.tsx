import { FC, useEffect, useState } from "react"
import { AiOutlineMenu } from 'react-icons/ai'
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

    // effects
    useEffect(() => {
        // -- control menu-width-variable with the <isMenuExpanded> state
        window.document.documentElement.style
        .setProperty('--menu-width', isMenuExpanded ? '18rem' : '5.5rem')
    }, [isMenuExpanded])

    return (
        <div className={getStyles(`Menu ${isMenuExpanded ? '' : 'menu-closed'}`)}>
            <div className={styles["menu-header"]}>
                <h4 className={styles["menu-title"]}>Menu</h4>
                <AiOutlineMenu className={styles["menu-icon"]} size={32} onClick={() => setIsMenuExpanded(s=>!s)} />
            </div>
            {/* links */}
            <MenuLinks />
        </div>
    )
}

export default Menu