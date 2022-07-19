// types
import { useRouter } from 'next/router'
import { FC } from 'react'
// icons
import { BiArrowBack } from 'react-icons/bi'
// styles
import styles from '../../styles/components/shared/goBack.module.css'


const GoBack: FC = () => {
    // states
    const back = useRouter().back
    return (
        <div className={styles["GoBack"]} title="Back" onClick={back}>
            <BiArrowBack size={28} />
        </div>
    )
}

export default GoBack
