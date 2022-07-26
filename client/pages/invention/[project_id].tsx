import Head from "next/head"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
// types
import { InventionPageProps, InventionPageSSR } from "../../types/pages/invention.type"
// utils
import { AUTH_TOKEN, tokenHeader } from "../../configs/_token"
import { fetchInventionData } from "../../utils/api/requests/user.api"
// redux
import { inventionActions, inventionSelector } from "../../redux/features/invention"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
// components
import InformationSection from "../../components/Invention/DataSections/Information.section"
import AssetsSection from "../../components/Invention/DataSections/Assets.section"
import AboutYouSection from "../../components/Invention/DataSections/AboutYou.section"
import MembersSection from "../../components/Invention/DataSections/Members.section"
import Loading from "../../components/global/loading"
import InventionNotFound from "../../components/global/404/inventionNotFound"
// styles
import styles from '../../styles/pages/project.module.css'


const ProjectViewer: FC<InventionPageProps> = ({Invention}) => {
    // states
    const dispatch = useAppDispatch()
    const { back } = useRouter()
    const { User, isLoading } = useAppSelector(userSelector)
    const { Invention: InventionState } = useAppSelector(inventionSelector)

    // effects
    useEffect(() => {
        if (User)
            dispatch(inventionActions.storeInvention({Invention, my_user_id: User._id}))
    }, [User])

    if (InventionState) return (
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
                <InformationSection />
                <AssetsSection />
                <AboutYouSection />
                <MembersSection />
            </div>
            {/* section-editor component */}
            
        </main>
    )
    else if (isLoading) return <Loading />
    else return <InventionNotFound />
}


// SSR: Fetch invention data before loading page
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