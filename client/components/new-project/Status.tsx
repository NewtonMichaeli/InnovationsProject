// types
import { Dispatch, FC, KeyboardEvent, SetStateAction } from "react"
import { STATUS_ENUM } from "../../redux/features/user/user.types"
// icons
import { MdClose } from "react-icons/md"
// styles
import styles from '../../styles/components/new-project/status.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const Status: FC<{
    status: string,
    setStatus: (val: keyof typeof STATUS_ENUM) => unknown
}> = ({status, setStatus: setStatue}) => {

    return (
        <select name="Status" id="Status" className={styles["status"]}>
            <option value="open" defaultChecked>Open</option>
            <option value="in-development">In development</option>
            <option value="finished">Finished</option>
        </select>
    )
}

export default Status