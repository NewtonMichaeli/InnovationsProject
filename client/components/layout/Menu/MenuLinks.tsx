import Link from "next/link"
import { useRouter } from "next/router"
// types
import { FC } from "react"
import { CLIENT_URIS } from "../../../configs/_client"
// redux
import { useAppSelector } from "../../../hooks/redux"
import { userSelector } from "../../../redux/features/user"
// icons
import { AiOutlineHome, AiOutlineLogin, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import { BiStats, BiUser } from 'react-icons/bi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
// styles
import styles from '../../../styles/components/layout/menu.module.css'
import { getModuleStylesMethod } from "../../../utils/styles.utils";

// get multiple styles method
const getStyles = getModuleStylesMethod(styles)


/**
 * @returns a rendered component, with menu-links for an unauthorized user
 */
const MenuLinks_UnauthorizedUser: FC = () => {
    // states
    const { pathname } = useRouter()
    // shorthand method for checking current path:
    const path_has = (dest_paths: string[]) => dest_paths.some(dp => pathname.startsWith(dp))

    return <>
        <Link href={CLIENT_URIS.LOGIN}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.LOGIN, CLIENT_URIS.REGISTER]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Login</span>
                <AiOutlineLogin className={styles["icon"]} size={34} />
            </a>
        </Link>
        <Link href={CLIENT_URIS.EXPLORE}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.EXPLORE, CLIENT_URIS._USER(''), CLIENT_URIS._INVENTION('')]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Explore</span>
                <AiOutlineSearch className={styles["icon"]} size={34} />
            </a>
        </Link>
        <Link href={CLIENT_URIS.SETTINGS}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.SETTINGS]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Settings</span>
                <AiOutlineSetting className={styles["icon"]} size={34} />
            </a>
        </Link>
    </>
}


/**
 * @returns a rendered component, with menu-links for an authorized user
 */
export const MenuLinks_AuthorizedUser: FC = () => {
    // states
    const { pathname } = useRouter()
    // shorthand method for checking current path:
    const path_has = (dest_paths: string[]) => dest_paths.some(dp => pathname.startsWith(dp))

    return <>
        <Link href={CLIENT_URIS.HOME}>
            <a className={getStyles(`menu-link ${pathname === CLIENT_URIS.HOME ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Home</span>
                <AiOutlineHome className={styles["icon"]} size={34} />
            </a>
        </Link>
        <Link href={CLIENT_URIS.EXPLORE}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.EXPLORE, CLIENT_URIS._USER(''), CLIENT_URIS._INVENTION('')]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Explore</span>
                <AiOutlineSearch className={styles["icon"]} size={34} />
            </a>
        </Link>
        <Link href={CLIENT_URIS.PROFILE}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.PROFILE]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Profile</span>
                <BiUser className={styles["icon"]} size={34} />
            </a>
        </Link>
        <Link href={CLIENT_URIS.DASHBOARD}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.DASHBOARD, CLIENT_URIS.NEW_PROJECT]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Dashboard</span>
                <MdOutlineSpaceDashboard className={styles["icon"]} size={34} />
            </a>
        </Link>
        <Link href={CLIENT_URIS.STATSISTICS}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.STATSISTICS]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Statistics</span>
                <BiStats className={styles["icon"]} size={34} />
            </a>
        </Link>
        <Link href={CLIENT_URIS.SETTINGS}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.SETTINGS]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Settings</span>
                <AiOutlineSetting className={styles["icon"]} size={34} />
            </a>
        </Link>
    </>
}


/**
 * @returns a rendered component, with loading-links-animation while loading
 */
const MenuLinks_LoadingUser: FC = () => {
    return <>{
        Array.apply(null, Array(5)).map((v,i) => (
            <div key={i} className={styles["menu-link-loading"]}>
                <span style={{animationDelay: `0.${i*2}s`}}></span>
            </div>
        ))
    }</>
}


/**
 * @returns the appropriate menu-links for a user
 */
const MenuLinks: FC = () => {
    const { isLoading, isAuthenticated } = useAppSelector(userSelector)
    if (isLoading) return <MenuLinks_LoadingUser/>
    else if (isAuthenticated) return <MenuLinks_AuthorizedUser/>
    else return <MenuLinks_UnauthorizedUser/>
}


export default MenuLinks