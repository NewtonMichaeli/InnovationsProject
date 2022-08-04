import { FC, useState } from 'react'
// types
import { INVENTION_USER_ROLES } from '../../../configs/_client'
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { inventionActions, inventionSelector } from '../../../redux/features/invention'
import { pushFeedback } from '../../../redux/features/ui/ui.actions'
// utils
import { updateInventionInputHandler } from '../../../utils/forms/updateInvention.form'
// components
import List from '../../new-project/List'
import GoBack from '../../shared/GoBack'
// styles
import styles from '../../../styles/components/Invention/EditSections/aboutyou.module.css'


const AboutYou_EditSection: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { InventionUserRole, Invention } = useAppSelector(inventionSelector)
    const [roles, setRoles] = useState([...Invention.Project.Roles])
    // handlers
    const submitHandler = () => {
        try {
            dispatch(inventionActions.updateInvention(updateInventionInputHandler({Roles: roles}, Invention.Project._id)))
        }
        catch (err) {
            dispatch(pushFeedback({status: false, msg: err.message ?? "An error has occured"}))
        }
    }

    {/* show if either creator or contributor */}
    if (InventionUserRole !== INVENTION_USER_ROLES.OBSERVER) return (
        <section className={styles["Aboutyou"]}>
            {/* go-back btn */}
            <GoBack />
            <div className={styles["content"]}>
                {/* header */}
                <div className={styles["header"]}>
                    <h1>Edit "{Invention.Project.Name}" Roles</h1>
                    <p>As this project's creator, you can create and change your own roles.</p>
                </div>
                <div className={styles["form"]}>
                    <div className={styles["form-title"]}>
                        <h3>My Roles</h3>
                        <p>Add or remove your roles.</p>
                    </div>
                    {/* my roles */}
                    <List list={roles} setList={setRoles} mode="roles" />
                    {/* submit */}
                    <div className={styles["btn-submit"]}>
                        <input type="submit" value="Save Changes" onClick={submitHandler} />
                    </div>
                </div>
            </div>
        </section>
    )
    else return <></>
}

export default AboutYou_EditSection