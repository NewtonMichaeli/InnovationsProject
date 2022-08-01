import Head from 'next/head'
import { FC, useState } from 'react'
// types
import { ContributorType } from '../../../types/data/invention.types'
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { inventionActions } from '../../../redux/features/invention'
import { inventionSelector } from '../../../redux/features/invention'
// utils
import { updateInventionInputHandler } from '../../../utils/forms/updateInvention.form'
// components
import List from '../../new-project/List'
import GoBack from '../../shared/GoBack'
import Contributors from '../../new-project/Contributors'
// styles
import styles from '../../../styles/components/Invention/EditSections/members.module.css'


const Contributors_EditSection: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { Invention } = useAppSelector(inventionSelector)
    // data
    const [contributors, setContributors] = useState<ContributorType[]>(Invention.Project.Contributors)
    const [selectedContributor, setSelectedContributor] = useState<string>(null)
    // handlers
    const submitHandler = async () => {
        try {
            await dispatch(inventionActions.updateInvention(
                updateInventionInputHandler({Contributors: contributors}, Invention.Project._id)
            ))
        }
        catch (err) {
            console.log(err)    // -- temp
        }
    }
    // components
    const MemberRoles: FC<{
        Contributor?: ContributorType
    }> = ({Contributor}) => {
    
        if (!Contributor) return <></>
        else return (
            <div className={styles["MemberRoles"]}>
                <h4 className={styles["title"]}>{Contributor.Fname}'s Roles</h4>
                <List list={Contributor.Roles} mode='roles'
                    setList={(vals) => setContributors(s => s.map(c => c._id === Contributor._id ? {...c, Roles: vals} : c))} />
            </div>
        )
    }

    return (
        <section className={styles["Members"]}>
            <Head>
                {/* <title>Members - Innovation</title> */}
            </Head>
            {/* go-back */}
            <GoBack />
            <div className={styles["content"]}>
                <div className={styles["header"]}>
                    <h1>Edit "{Invention.Project.Name}" Contributors</h1>
                    <p>Your own invention, where you can plan everything, upload assets and share with others.</p>
                </div>
                <div className={styles["form"]}>
                    <div className={styles["form-title"]}>
                        <h3>Members</h3>
                        <p>Select any member and edit his roles.</p>
                    </div>
                    {/* contributors list */}
                    <Contributors list={contributors} setList={setContributors} 
                        setSelected={[selectedContributor, setSelectedContributor]} />
                    {/* member roles */}
                    <MemberRoles Contributor={contributors.find(({_id}) => selectedContributor === _id)} />
                    {/* submit */}
                    <div className={styles["btn-submit"]}>
                        <input type="submit" value="Save Changes" onClick={submitHandler} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contributors_EditSection