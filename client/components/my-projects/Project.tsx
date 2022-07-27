import Link from "next/link"
import { FC } from "react"
import { CLIENT_URIS } from "../../configs/_client"
import { SharedProjectsResponseType } from "../../redux/features/user/user.types"
// styles
import styles from '../../styles/pages/myProjects.module.css'
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
                {
                    list.map((item, i) => (
                        <code key={i} className={styles['item']}>{item}</code>
                    ))
                }
            </div>
        </div>
    )
}


// a project component
const Project: FC<{
    isCreator: boolean,
    invention: SharedProjectsResponseType
}> = ({isCreator, invention: {CreatorData, Project}}) => {
    return (
        <Link href={CLIENT_URIS._DASHBOARD(Project._id)} shallow>
            <div className={styles['invention']}>
                {/* header */}
                <div className={styles['invention-header']}>
                    <img className={styles['profile-pic']} src={`/profile-pics/${CreatorData.Profile_Pic}.jpeg`} alt={CreatorData.Username} />
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
                    {Project.Status} • {Project.Contributors.length + 1} members
                </h5>
            </div>
        </Link>
    )
}

export default Project