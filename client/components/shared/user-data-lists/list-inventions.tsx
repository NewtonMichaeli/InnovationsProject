// types
import {FC} from 'react'
import { UserType } from '../../../redux/features/user/user.types'
// utils
import { seperateSharedProjectsFormattedInventions } from '../../../utils/inventions.utils'
// components
import GoBack from '../GoBack'
import RenderProjects from '../Project'
// styles
import styles from '../../../styles/components/profile/list-inventions.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)

const ListInventions: FC<{
    show: boolean,
    UserData: UserType,
    close: () => unknown
}> = ({show, close, UserData}) => {
    // states
    const Inventions = seperateSharedProjectsFormattedInventions(UserData)
    // handlers
    const onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        close()
    }

    return (
        // wrapper - has no dimensions, referencing parent position for clip-path property
        <div className={getStyles(`list-inventions-wrapper ${show ? 'show':''}`)}>
            {/* absolute container frame */}
            <div className={styles["list-inventions"]}>
                {/* content inside container */}
                <GoBack onClick={onClose} />
                <div className={styles["content"]}>
                    {/* inventions */}
                    <section className={styles["inventions"]}>
                        <div className={styles["section-header"]}>
                            <div className={styles["title"]}>
                                <img src={`/profile-pics/${UserData.Profile_Pic}.jpeg`} alt={UserData.Username} />
                                <h2 className={styles["username"]}>{UserData.Username}'s Inventions</h2>
                            </div>
                        </div>
                        {/* render inventions */}
                        <RenderProjects Inventions={Inventions.Inventions} />
                    </section>
                    {/* shared projects */}
                    <section className={styles["shared-inventions"]}>
                        <div className={styles["section-header"]}>
                            <div className={styles["title"]}>
                                <img src={`/profile-pics/${UserData.Profile_Pic}.jpeg`} alt={UserData.Username} />
                                <h2 className={styles["username"]}>{UserData.Username}'s Shared Inventions</h2>
                            </div>
                        </div>
                        {/* render shared-projects */}
                        <RenderProjects Inventions={Inventions.Shared_Projects} />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ListInventions
