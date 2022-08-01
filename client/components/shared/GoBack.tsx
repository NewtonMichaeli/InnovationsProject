// types
import { useRouter } from 'next/router'
import { FC } from 'react'
import { CLIENT_URIS } from '../../configs/_client'
// icons
import { BiArrowBack } from 'react-icons/bi'
// styles
import styles from '../../styles/components/shared/goBack.module.css'


/**
 * @param onclick (typeof Function -> custom go-back functionality. default is 'router().back()')
 * @returns JSX component for going-back functionallity
 */
const GoBack: FC<{
    onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => unknown,
    className?: string
}> = ({onClick, className}) => {
    // states
    const { push, back } = useRouter()
    const backToExplorePage = () => back()
    // const backToExplorePage = () => push(CLIENT_URIS.EXPLORE)
    
    return (
        <div className={`${styles["GoBack"]} ${className ?? ''}`} title="Back" onClick={onClick ?? backToExplorePage}>
            <BiArrowBack size={28} />
        </div>
    )
}

export default GoBack
