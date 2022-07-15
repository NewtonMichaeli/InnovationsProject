import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai'
// redux
import { useAppSelector } from "../../../hooks/redux";
import { userSelector } from "../../../redux/features/user";
// components
import { MenuLinks_AuthorizedUser, MenuLinks_LoadingUser, MenuLinks_UnauthorizedUser } from './MenuLinks'
// styles
import styles from '../../../styles/components/layout/menu.module.css'
import { getModuleStylesMethod } from "../../../utils/styles.utils";

// get multiple styles method
const getStyles = getModuleStylesMethod(styles)


const Menu: FC = () => {

    // States
    const [isMenuExpanded, setIsMenuExpanded] = useState(false)
    const { isLoading, isAuthenticated } = useAppSelector(userSelector)
    // conditional rendered links-set
    const GetMenuLinks: FC = () => {
        if (isLoading) return <MenuLinks_LoadingUser/>
        else if (isAuthenticated) return <MenuLinks_AuthorizedUser/>
        else return <MenuLinks_UnauthorizedUser/>
    }
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
            <GetMenuLinks />
        </div>
    )
}

export default Menu