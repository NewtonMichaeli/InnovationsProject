// types
import { Dispatch, FC, SetStateAction } from "react"
import { ContributorType } from "../../../../types/data/invention.types"
// components
import List from "../../../new-project/List"
// styles
import styles from '../../../../styles/components/Invention/EditSections/members.module.css'


const MemberRoles: FC<{
    Contributor?: ContributorType,
    setContributors: Dispatch<SetStateAction<ContributorType[]>>
}> = ({Contributor, setContributors}) => {

    if (!Contributor) return <></>
    else return (
        <div className={styles["MemberRoles"]}>
            <h4 className={styles["title"]}>{Contributor.Fname}'s Roles</h4>
            <List list={Contributor.Roles} mode='roles'
                setList={(vals) => setContributors(s => s.map(c => c._id === Contributor._id ? {...c, Roles: vals} : c))} />
        </div>
    )
}

export default MemberRoles