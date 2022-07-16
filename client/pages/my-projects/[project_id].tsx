import { useRouter } from "next/router"
import { FC } from "react"
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
import AssetsSection from "../../components/InventionDataSections/Assets.section"
// components
import InventionNotFound from "../../components/global/404/inventionNotFound"
// redux
import { useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"
// styles
import styles from '../../styles/pages/project.module.css'
import { getModuleStylesMethod } from "../../utils/styles.utils"
import InformationSection from "../../components/InventionDataSections/Information.section"
import AboutYouSection from "../../components/InventionDataSections/AboutYou.section"
import MembersSection from "../../components/InventionDataSections/Members.section"

// get multiple styles util
const getStyles = getModuleStylesMethod(styles)


const ProjectViewer: FC = () => {

    // states
    const router = useRouter()
    const { User } = useAppSelector(userSelector)
    const { project_id } = router.query
    let inventionOwner = {
        Username: User?.Username,
        Profile_Pic: User?.Profile_Pic
    }
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
        <div className={styles['Project']}>
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
                <InformationSection Invention={current_invention} />
                <AssetsSection Assets={current_invention.Assets} username={inventionOwner.Username} project_id={current_invention._id} />
                <AboutYouSection isCreator={User.Username === inventionOwner.Username} roles={current_invention.Roles} />
                {/* <MembersSection Members={[{user_id: inventionOwner.}]} /> */}
            </div>
        </div>
    )
    else return <InventionNotFound />
}

export default ProjectViewer