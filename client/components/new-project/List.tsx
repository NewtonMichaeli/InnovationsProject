// types
import { Dispatch, FC, KeyboardEvent, SetStateAction } from "react"
// icons
import { MdClose } from "react-icons/md"
// styles
import styles from '../../styles/components/new-project/list.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)

const Tag: FC<{
    value: string
    removeValue: (val: string) => unknown
}> = ({value, removeValue}) => {
    return (
        <div className={styles["tag"]}>
            <p className={styles["value"]}>{value}</p>
            <MdClose className={styles["close-btn"]} size={16} onClick={() => removeValue(value)} />
        </div>
    )
}


const Tags: FC<{
    list: string[],
    setList: (vals: string[]) => unknown
    mode: 'tag' | 'occupation'
}> = ({list, setList, mode}) => {
    // handlers
    const addValue = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key, target: { value } } = e
        // check pressed-key-type
        if (key === "Enter" && value && !list.includes(value)) {
            setList([...list, value])
            e.target.value = null
        }
    }
    const removeValue = (value: string) => {
        setList(list.filter(val => val !== value))
    }

    return (
        <div className={getStyles(`list ${mode}`)}>
            {list.map(t => <Tag key={t} value={t} removeValue={removeValue} />)}
            <input type="text" id={mode} onKeyDown={addValue} placeholder={`Add ${mode}`} />
        </div>
    )
}

export default Tags