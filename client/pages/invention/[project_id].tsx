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
import { InventionPageProps, InventionPageSSR } from "../../types/pages/invention.type"
import { fetchInventionData } from "../../utils/api/requests/user.api"
import { AUTH_TOKEN, tokenHeader } from "../../configs/_token"
import { CLIENT_URIS } from "../../configs/_client"
// import { getModuleStylesMethod } from "../../utils/styles.utils"

// get multiple styles util
// const getStyles = getModuleStylesMethod(styles)


const ProjectViewer: FC<InventionPageProps> = ({Invention}) => {

    // states
    const { query, back } = useRouter()
    const { project_id } = query

    if (Invention) return (
        <main className={styles['Project']}>
            <Head>
                <title>{Invention.Project.Name} - {Invention.CreatorData.Username}</title>
                <meta name="description" content={Invention.Project.Description} />
            </Head>
            {/* header */}
            <div className={styles['project-header']}>
                <BsArrowLeftShort className={styles['leave']} size={48} onClick={() => back()} title="Go back" />
                <img className={styles['owner-profile-pic']} src={`/profile-pics/${Invention.CreatorData.Profile_Pic}.jpeg`} alt={Invention.CreatorData.Username} />
                <div className={styles['username-x-projectname']}>
                    <code className={styles['username']}>{Invention.CreatorData.Username}</code>
                    &nbsp;/&nbsp;
                    <code className={styles['projectname']}>{Invention.Project.Name}</code>
                </div>
            </div>
            {/* content */}
            <div className={styles["invention-content-wrapper"]}>
                {/* data sections */}
                <div className={styles["section-container"]}>
                    <InformationSection Invention={Invention.Project} />
                </div>
                <div className={styles["section-container"]}>
                    <AssetsSection Assets={Invention.Project.Assets} project_id={Invention.Project._id} />
                </div>
                <div className={styles["section-container"]}>
                    <AboutYouSection isCreator={Invention.CreatorData.Username === Invention.CreatorData.Username} roles={Invention.Project.Roles} />
                </div>
                <div className={styles["section-container"]}>
                    <MembersSection Members={Invention.Project.Contributors} />
                </div>
            </div>
        </main>
    )
    else return <InventionNotFound />
}


export const getServerSideProps: InventionPageSSR = async context => {
    // get user data
    const project_id = context.params['project_id'] as string

    if (project_id) {
        try {
            const res = await fetchInventionData(
                {project_id}, 
                tokenHeader(context.req.cookies[AUTH_TOKEN])
            )
            return {
                props: {Invention: res.data}
            }
        }
        catch (err) {
            return {notFound: true}
        }
    }
    else return {notFound: true}
}


export default ProjectViewer