import { FC, Fragment, KeyboardEvent, useRef, useState } from "react"
// types
import { ContributorType } from "../../types/data/invention.types"
import { MinifiedUserType } from "../../types/data/user.types"
// utils
import { searchByQuery } from "../../utils/api/requests/user.api"
import { PUBLIC_SRC } from "../../configs/_client"
// redux
import { useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"
// icons
import { MdClose } from "react-icons/md"
// styles
import styles from '../../styles/components/new-project/contributors.module.css'


const Contributor: FC<{
    user: MinifiedUserType,
    removeContributor: (id: string) => unknown
}> = ({user: {_id, Username, Profile_Pic}, removeContributor}) => {
    return (
        <div className={styles["User"]} title={Username}>
            <img src={PUBLIC_SRC.PROFILE_PIC(Profile_Pic)} alt={Username} />
            <MdClose className={styles["close-btn"]} size={16} onClick={() => removeContributor(_id)} title={`Remove ${Username}`} />
        </div>
    )
}


const UserOptions: FC<{
    users: ContributorType[],
    addContributor: (user: ContributorType) => unknown
}> = ({users, addContributor}) => {
    return (
        <section className={styles["select-users-frame"]}>
            {users.map(u => (
                <Fragment key={u._id}>
                    <div className={styles["UserOption"]} onClick={() => addContributor(u)}>
                        <img src={PUBLIC_SRC.PROFILE_PIC(u.Profile_Pic)} alt={u.Username} />
                        <div className={styles["data"]}>
                            <h2 className={styles["name"]}>{u.Fname}&nbsp;{u.Sname}</h2>
                            <p className={styles["username-x-email"]}>
                                {u.Username}&nbsp;•&nbsp;{u.Email}
                            </p>
                        </div>
                    </div>
                    <div className={styles["user-seperator"]}></div>
                </Fragment>
            ))}
        </section>
    )
}


const Contributors: FC<{
    list: ContributorType[],
    setList: (vals: ContributorType[]) => unknown
}> = ({list, setList}) => {
    // states
    const {User: {_id}} = useAppSelector(userSelector)
    const input_ref = useRef(null)
    const [userOptions, setUserOptions] = useState<ContributorType[]>([])
    // handlers
    const addContributor = (user: ContributorType) => {
        if (!list.some(u => u._id === user._id)) {
            setList([...list, user])
            setUserOptions([])
            input_ref.current.value = null
        }
    }
    const removeContributor = (id: string) => {
        setList(list.filter(u => u._id !== id))
    }
    const onChangeHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        const {value: query} = e.target
        if (query.length > 2 && query.trim().length) {
            const res = await searchByQuery({limit: 4, query, excludeUsers: [_id, ...list.map(u => u._id)]})
            setUserOptions(res.data.map(u => ({...u, Roles: []})))
        }
        else setUserOptions([])
    }

    return (
        <div className={styles[`list-wrapper`]}>
            <div className={styles[`list`]}>
                {list.map((t,i) => <Contributor key={i} user={t} removeContributor={removeContributor} />)}
                <div className={styles["input-container"]}>
                    <input type="text" id="contributor" onChange={onChangeHandler} placeholder={`Add Members`} ref={input_ref} />
                    {/* select list */}
                    {userOptions.length !== 0 && <UserOptions addContributor={addContributor} users={userOptions} />}
                </div>
            </div>
        </div>
    )
}

export default Contributors