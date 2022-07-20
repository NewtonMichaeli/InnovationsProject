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
import { findInvention } from "../../utils/inventions.utils"
// import { getModuleStylesMethod } from "../../utils/styles.utils"

// get multiple styles util
// const getStyles = getModuleStylesMethod(styles)


const ProjectViewer: FC = () => {

    // states
    const { query, back } = useRouter()
    const { project_id } = query
    const { User } = useAppSelector(userSelector)
    const { data: inventionData, owner: inventionOwner } = findInvention(User, project_id as string)

    if (inventionData) return (
        <main className={styles['Project']}>
            <Head>
                <title>{inventionData.Name} - {User.Username}</title>
                <meta name="description" content={inventionData.Description} />
            </Head>
            {/* header */}
            <div className={styles['project-header']}>
                <BsArrowLeftShort className={styles['leave']} size={48} onClick={() => back()} title="Go back" />
                <img className={styles['owner-profile-pic']} src={`/profile-pics/${inventionOwner.Profile_Pic}.jpeg`} alt={inventionOwner.Username} />
                <div className={styles['username-x-projectname']}>
                    <code className={styles['username']}>{inventionOwner.Username}</code>
                    &nbsp;/&nbsp;
                    <code className={styles['projectname']}>{inventionData.Name}</code>
                </div>
            </div>
            {/* content */}
            <div className={styles["invention-content-wrapper"]}>
                {/* data sections */}
                <div className={styles["section-container"]}>
                    <InformationSection Invention={inventionData} />
                </div>
                <div className={styles["section-container"]}>
                    <AssetsSection Assets={inventionData.Assets} username={inventionOwner.Username} project_id={inventionData._id} />
                </div>
                <div className={styles["section-container"]}>
                    <AboutYouSection isCreator={User.Username === inventionOwner.Username} roles={inventionData.Roles} />
                </div>
                <div className={styles["section-container"]}>
                    <MembersSection Members={inventionData.Contributors} />
                </div>
            </div>
        </main>
    )
    else if (!User) return <InventionNotFound />
    else return <></>
}

export default ProjectViewer