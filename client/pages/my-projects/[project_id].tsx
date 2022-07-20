import { useRouter } from "next/router"
import { FC, useEffect } from "react"
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
// components
import InventionNotFound from "../../components/global/404/inventionNotFound"
import InformationSection from "../../components/InventionDataSections/Information.section"
import AssetsSection from "../../components/InventionDataSections/Assets.section"
import AboutYouSection from "../../components/InventionDataSections/AboutYou.section"
import MembersSection from "../../components/InventionDataSections/Members.section"
// redux
import { useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"
// styles
import styles from '../../styles/pages/project.module.css'
import Loading from "../../components/global/loading"
import Head from "next/head"
// import { getModuleStylesMethod } from "../../utils/styles.utils"

// get multiple styles util
// const getStyles = getModuleStylesMethod(styles)


const ProjectViewer: FC = () => {

    // states
    const router = useRouter()
    const { User, isLoading, isAuthenticated } = useAppSelector(userSelector)
    const { project_id } = router.query
    let inventionOwner = { Username: User?.Username, Profile_Pic: User?.Profile_Pic }
    // find current invention using <project_id>
    const current_invention = 
        User?.Inventions.find(inv => inv._id === project_id) ??     // search invention in user-inventions-list
        User?.Shared_Projects.find(proj => {                        // user doesn't own the invention - search in shared-projects
            // -- set invention creator username to it's owner
            if (proj.Project._id === project_id) {
                inventionOwner = {Username: proj.CreatorData.Username, Profile_Pic: proj.CreatorData.Profile_Pic}
                return true
            }
            return false
        })?.Project

    if (current_invention) return (
        <main className={styles['Project']}>
            <Head>
                <title>{current_invention.Name} - {User.Username}</title>
                <meta name="description" content={current_invention.Description} />
            </Head>
            {/* header */}
            <div className={styles['project-header']}>
                <BsArrowLeftShort className={styles['leave']} size={48} onClick={() => router.back()} title="Go back" />
                <img className={styles['owner-profile-pic']} src={`/profile-pics/${inventionOwner.Profile_Pic}.jpeg`} alt={inventionOwner.Username} />
                <div className={styles['username-x-projectname']}>
                    <code className={styles['username']}>{inventionOwner.Username}</code>
                    &nbsp;/&nbsp;
                    <code className={styles['projectname']}>{current_invention.Name}</code>
                </div>
            </div>
            {/* content */}
            <div className={styles["invention-content-wrapper"]}>
                {/* data sections */}
                <div className={styles["section-container"]}>
                    <InformationSection Invention={current_invention} />
                </div>
                <div className={styles["section-container"]}>
                    <AssetsSection Assets={current_invention.Assets} username={inventionOwner.Username} project_id={current_invention._id} />
                </div>
                <div className={styles["section-container"]}>
                    <AboutYouSection isCreator={User.Username === inventionOwner.Username} roles={current_invention.Roles} />
                </div>
                <div className={styles["section-container"]}>
                    <MembersSection Members={current_invention.Contributors} />
                </div>
            </div>
        </main>
    )
    else if (!User) return <InventionNotFound />
    else return <></>
}

export default ProjectViewer