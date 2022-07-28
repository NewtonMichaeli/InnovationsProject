import Link from "next/link"
// types
import { FC } from "react"
import { CLIENT_URIS, PUBLIC_SRC } from "../../configs/_client"
// redux
import { useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"
import { SharedProjectsResponseType } from "../../types/data/invention.types"
// styles
import styles from '../../styles/components/shared/project.module.css'
import { getModuleStylesMethod } from "../../utils/styles.utils"

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const Tags: FC<{
    mode: 'tags' | 'occupations'
    list: string[],
}> = ({list, mode}) => {
    return (
        <div className={getStyles(`innovation-tags mode-${mode}`)}>
            <h4 className={styles['title']}>Project's {mode}:</h4>
            <div className={styles['items']}>
                {list.map((item, i) => 
                    <code key={i} className={styles['item']}>{item}</code>)}
            </div>
        </div>
    )
}


// a project component
const Project: FC<{
    invention: SharedProjectsResponseType
}> = ({invention: {CreatorData, Project}}) => {
    // states
    const isCreator = useAppSelector(userSelector).User?._id === CreatorData._id
    return (
        <Link href={CLIENT_URIS._DASHBOARD(Project._id)} shallow>
            <div className={getStyles(`invention status-${Project.Status.replace(' ', '-')}`)}>
                {/* header */}
                <div className={styles['invention-header']}>
                    <img className={styles['profile-pic']} src={PUBLIC_SRC.PROFILE_PIC(CreatorData.Profile_Pic)} alt={CreatorData.Username} />
                    <div className={styles['project-data']}>
                        <h2 className={styles['project-name']}>{Project.Name}</h2>
                        <i className={styles['creator-x-access']}>{isCreator ? 'Creator' : 'Contributor'} • {Project.Private ? 'Private' : 'Public'}</i>
                    </div>
                </div>
                {/* description */}
                <div className={styles['invention-description']}>
                    <code className={styles['description']}>{Project.Description}</code>
                </div>
                {/* tags */}
                <div className={styles['tags']}>
                    {/* occupations */}
                    {Project.Occupations.length ? <Tags mode='occupations' list={Project.Occupations} /> : ''}
                    {/* tags */}
                    {Project.Tags.length ? <Tags mode='tags' list={Project.Tags} /> : ''}
                </div>
                <h5 className={styles['status-x-members']}>
                    <img src={PUBLIC_SRC.INVENTION_STATUS(Project.Status)} alt={Project.Status} />
                    &nbsp;{Project.Status}&nbsp;•&nbsp;{Project.Contributors.length + 1}&nbsp;members
                </h5>
            </div>
        </Link>
    )
}


/**
 * @param Inventions (typeof SharedProjectResponseType[]) 
 * @returns component rendering the given projects in a responsive way
 */
const RenderProjects: FC<{
    Inventions: SharedProjectsResponseType[]
}> = ({Inventions}) => {
    return (
        <div className={getStyles(`my-projects-list ${Inventions.length === 1 ? 'single-invention':''}`)}>
            {!Inventions?.length
                // ? <code className={styles["no-inventions"]}>You have no Inventions yet</code>
                ? <></>
                : Inventions.sort((a, b) => b.Project.DoC - a.Project.DoC).map(inv => 
                    <Project key={inv.Project._id} invention={inv} />)}
        </div>
    )
}


export default RenderProjects