// types
import { FC, Fragment, KeyboardEvent, SetStateAction, useRef, useState } from "react"
import { MinifiedUserType } from "../../redux/features/user/user.types"
// utils
import { searchByQuery } from "../../utils/api/requests/user.api"
// icons
import { MdClose } from "react-icons/md"
// styles
import styles from '../../styles/components/new-project/contributors.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'
import { useAppSelector } from "../../hooks/redux"
import { userSelector } from "../../redux/features/user"

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const Contributor: FC<{
    user: MinifiedUserType,
    removeContributor: (id: string) => unknown
}> = ({user, removeContributor}) => {
    return (
        <div key={user._id} className={styles["User"]} onClick={() => removeContributor(user._id)} title={user.Username}>
            <img src={`/profile-pics/${user.Profile_Pic}.jpeg`} alt={user.Username} />
            <MdClose className={styles["close-btn"]} size={16} onClick={() => removeContributor(user._id)} />
        </div>
    )
}


const UserOption: FC<{
    user: MinifiedUserType,
    addContributor: (user: MinifiedUserType) => unknown
}> = ({user, addContributor}) => {
    return (
        <div key={user._id} className={styles["UserOption"]} onClick={() => addContributor(user)}>
            <img src={`/profile-pics/${user.Profile_Pic}.jpeg`} alt={user.Username} />
            <div className={styles["data"]}>
                <h2 className={styles["name"]}>{user.Fname}&nbsp;{user.Sname}</h2>
                <p className={styles["username-x-email"]}>
                    {user.Username}&nbsp;•&nbsp;{user.Email}
                </p>
            </div>
        </div>
    )
}


const UserOptions: FC<{
    users: MinifiedUserType[],
    addContributor: (user: MinifiedUserType) => unknown
}> = ({users, addContributor}) => {
    return (
        <section className={styles["select-users-frame"]}>
            {users.map(u => (
                <Fragment key={u._id}>
                    <UserOption addContributor={addContributor} user={u} />
                    <div className={styles["user-seperator"]}></div>
                </Fragment>
            ))}
        </section>
    )
}


const Contributors: FC<{
    list: MinifiedUserType[],
    setList: (vals: MinifiedUserType[]) => unknown
}> = ({list, setList}) => {
    // states
    const {User: {_id}} = useAppSelector(userSelector)
    const input_ref = useRef(null)
    const [userOptions, setUserOptions] = useState([])
    // handlers
    const addContributor = (user: MinifiedUserType) => {
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
        if (query.length && query.trim().length) {
            const res = await searchByQuery({limit: 4, query, excludeUsers: [_id, ...list.map(u => u._id)]})
            setUserOptions(res.data)
        }
        else setUserOptions([])
    }

    return (
        <div className={styles[`list`]}>
            {list.map((t,i) => <Contributor key={i} user={t} removeContributor={removeContributor} />)}
            <div className={styles["input-container"]}>
                <input type="text" id="contributor" onChange={onChangeHandler} placeholder={`Add Members`} ref={input_ref} />
                {/* select list */}
                {userOptions.length !== 0 && <UserOptions addContributor={addContributor} users={userOptions} />}
            </div>
        </div>
    )
}

export default Contributors