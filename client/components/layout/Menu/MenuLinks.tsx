import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
// icons
import { AiOutlineHome, AiOutlineLogin, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import { BiStats, BiUser } from 'react-icons/bi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { CLIENT_URIS } from "../../../configs/_client"
// styles
import styles from '../../../styles/components/layout/menu.module.css'
import { getModuleStylesMethod } from "../../../utils/styles.utils";

// get multiple styles method
const getStyles = getModuleStylesMethod(styles)


// active-link-animation (round) - apply to every link and it'll animate >.<
const ActiveLinkAnimation: FC = () => (
    <>
        <div className={styles["highlighted-link-animate-top"]}></div>
        <div className={styles["highlighted-link-animate-bottom"]}></div>
    </>
)


// Render menu-links for an Unauthorized user
export const MenuLinks_UnauthorizedUser: FC = () => {
    // states
    const { pathname } = useRouter()
    // shorthand method for checking current path:
    const path_has = (dest_paths: string[]) => dest_paths.some(dp => pathname.startsWith(dp))

    return <>
        <Link href={CLIENT_URIS.LOGIN}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.LOGIN, CLIENT_URIS._USER('')]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Login</span>
                <AiOutlineLogin className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
        <Link href={CLIENT_URIS.EXPLORE}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.EXPLORE]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Explore</span>
                <AiOutlineSearch className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
        <Link href={CLIENT_URIS.SETTINGS}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.SETTINGS]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Settings</span>
                <AiOutlineSetting className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
    </>
}

// Render menu-links for an Authorized user
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
                <ActiveLinkAnimation />
            </a>
        </Link>
        <Link href={CLIENT_URIS.EXPLORE}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.EXPLORE, CLIENT_URIS._USER('')]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Explore</span>
                <AiOutlineSearch className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
        <Link href={CLIENT_URIS.PROFILE}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.PROFILE]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Profile</span>
                <BiUser className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
        <Link href={CLIENT_URIS.DASHBOARD}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.DASHBOARD]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Dashboard</span>
                <MdOutlineSpaceDashboard className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
        <Link href={CLIENT_URIS.STATSISTICS}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.STATSISTICS]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Statistics</span>
                <BiStats className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
        <Link href={CLIENT_URIS.SETTINGS}>
            <a className={getStyles(`menu-link ${path_has([CLIENT_URIS.SETTINGS]) ? 'highlighted' : ''}`)}>
                <span className={styles['link-text']}>Settings</span>
                <AiOutlineSetting className={styles["icon"]} size={34} />
                <ActiveLinkAnimation />
            </a>
        </Link>
    </>
}

// Render loading-links-animation while loading
export const MenuLinks_LoadingUser: FC = () => {
    return <>{
        Array.apply(null, Array(5)).map((v,i) => (
            <div key={i} className={styles["menu-link-loading"]}>
                <span style={{animationDelay: `0.${i*2}s`}}></span>
            </div>
        ))
    }</>
}