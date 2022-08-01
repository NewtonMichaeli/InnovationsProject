// types
import { FC } from "react"
// icons
import { MdOutlineLock, MdOutlinePublic } from "react-icons/md"
// styles
import styles from '../../styles/components/new-project/private.module.css'


const Private: FC<{
    setIsPrivate: (is: boolean) => unknown,
    isPrivate?: boolean
}> = ({setIsPrivate, isPrivate}) => {

    return (    
       <div className={styles["input-field"]}>
            <div className={styles["radio-opt"]}>
                <input type="radio" name="Private" id="Private-false" value={0} defaultChecked={isPrivate ?? true} />
                <div className={styles["label"]}>
                    <MdOutlinePublic size={26} />
                    <div className={styles["text"]}>
                        <label htmlFor="Private-false">Public</label>
                        <p>Anyone can see this invention. You choose who can make changes.</p>
                    </div>
                </div>
            </div>
            <div className={styles["radio-opt"]}>
                <input type="radio" name="Private" id="Private-true" value={1} onChange={e => setIsPrivate(e.target.checked)} />
                <div className={styles["label"]}>
                    <MdOutlineLock size={26} />
                    <div className={styles["text"]}>
                        <label htmlFor="Private-true">Private</label>
                        <p>You choose who can access and make changes to this invention.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Private