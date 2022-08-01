import Head from "next/head"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
// types
import { InventionPageProps, InventionPageSSR } from "../../types/pages/invention.type"
// utils
import { AUTH_TOKEN, tokenHeader } from "../../configs/_token"
import { fetchInventionData } from "../../utils/api/requests/invention.api"
// redux
import { inventionActions, inventionSelector } from "../../redux/features/invention"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"
// icons
import { BsArrowLeftShort } from 'react-icons/bs'
// components
import Information_DataSection from "../../components/Invention/DataSections/Information.data"
import Assets_DataSection from "../../components/Invention/DataSections/Assets.data"
import AboutYou_DataSection from "../../components/Invention/DataSections/AboutYou.data"
import Members_DataSection from "../../components/Invention/DataSections/Members.data"
import Loading from "../../components/global/loading"
import InventionNotFound from "../../components/global/404/inventionNotFound"
// styles
import styles from '../../styles/pages/project.module.css'
import EditorSection from "../../components/Invention/EditSections"
import { CLIENT_URIS, PUBLIC_SRC } from "../../configs/_client"
import Link from "next/link"


const ProjectViewer: FC<InventionPageProps> = ({Invention}) => {
    // states
    const dispatch = useAppDispatch()
    const { push } = useRouter()
    const { User, isLoading } = useAppSelector(userSelector)
    const { Invention: InventionState } = useAppSelector(inventionSelector)

    // effects
    useEffect(() => {
        dispatch(inventionActions.storeInvention({Invention, my_user_id: User?._id}))
    }, [User])

    if (InventionState) return (
        <main className={styles['Project']}>
            <Head>
                <title>{Invention.Project.Name} - {Invention.CreatorData.Username}</title>
                <meta name="description" content={Invention.Project.Description} />
            </Head>
            {/* header */}
            <div className={styles['project-header']}>
                <BsArrowLeftShort className={styles['leave']} size={48} onClick={() => push(CLIENT_URIS._USER(Invention.CreatorData.Username))} title="Go back" />
                <img className={styles['owner-profile-pic']} src={PUBLIC_SRC.PROFILE_PIC(Invention.CreatorData.Profile_Pic)} alt={Invention.CreatorData.Username} />
                <div className={styles['username-x-projectname']}>
                    <Link href={CLIENT_URIS._USER(InventionState.CreatorData.Username)}>
                        <code className={styles['username']}>{Invention.CreatorData.Username}</code>
                    </Link>
                    &nbsp;/&nbsp;
                    <code className={styles['projectname']}>{Invention.Project.Name}</code>
                </div>
            </div>
            {/* content */}
            <div className={styles["invention-content-wrapper"]}>
                {/* data sections */}
                <Information_DataSection />
                <Assets_DataSection />
                <AboutYou_DataSection />
                <Members_DataSection />
            </div>
            {/* section-editor component */}
            <EditorSection />
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