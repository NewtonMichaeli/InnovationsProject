import Link from 'next/link'
import {Dispatch, FC, useRef, KeyboardEvent, SetStateAction, useEffect} from 'react'
// types
import { AssetType } from '../../types/data/invention.types'
import { SERVER_URI__DOWNLOAD_ASSET, SERVER_URI__GET_ASSET } from '../../configs/_server'
// redux
import { useAppDispatch } from '../../hooks/redux'
import { uiActions } from '../../redux/features/ui'
// icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { HiOutlineDownload, HiOutlineLink } from 'react-icons/hi'
// components
import RenderFile from './file-renderer'
import GoBack from './GoBack'
// styles
import styles from '../../styles/components/shared/assets-list-viewer.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const AssetsListViewer: FC<{
    Assets: AssetType[],
    project_id: string,
    idx: number,
    setIdx: Dispatch<SetStateAction<number>>
}> = ({Assets, idx, setIdx, project_id}) => {
    // states
    const dispatch = useAppDispatch()
    const assets_list_ref = useRef(null)
    // handlers
    const setAssetIdx = (res: number)  => {
        console.log(res)
        if (res >= 0 && res < Assets.length) setIdx(res)
    }
    const changeIdx = (dir: -1 | 1) => setAssetIdx(idx + dir)
    const copyAssetLink = () => {
        navigator.clipboard.writeText(SERVER_URI__GET_ASSET(project_id, Assets[idx].path))
        dispatch(uiActions.pushFeedback({status: true, msg: 'Asset copied to your clipboard!'}))
    }

    // effects
    useEffect(() => {
        if (assets_list_ref.current) {
            assets_list_ref.current.style.marginLeft = `${idx * -4.52 + 13}rem`
            assets_list_ref.current.scrollTo(0,0)
        }
    }, [assets_list_ref, idx])

    if (idx === null) return <></>
    else return (
        <div className={styles["AssetsListViewer"]}>
            {/* go-back */}
            <GoBack className={styles["go-back-btn"]} onClick={() => setIdx(null)} />
            <div className={styles["content"]}>
                <div className={styles["asset-data"]}>
                    <div className={styles["file"]}>
                        <RenderFile detailed file={Assets[idx]} project_id={project_id} />
                    </div>
                    <p className={styles["asset-description"]}>{Assets[idx]?.description}</p>
                    {/* asset options */}
                    <div className={styles["asset-options"]}>
                        <HiOutlineLink size={26} title="Copy asset link" onClick={copyAssetLink} />
                        <Link target={'_blank'} href={SERVER_URI__DOWNLOAD_ASSET(project_id, Assets[idx].path)}>
                            <HiOutlineDownload size={26} title="Download asset" />
                        </Link>
                    </div>
                </div>
                <div className={styles["controllers"]}>
                    <BiLeftArrowAlt className={getStyles(`prev-asset ${idx === 0 ? 'disabled' : ''}`)} 
                        size={28} onClick={() => changeIdx(-1)} title="Previous asset" />
                    <div className={styles["assets"]}>
                        <div className={styles["list"]} ref={assets_list_ref}>
                            {Assets.map((a,i) => 
                                <div className={styles["file-btn"]} onClick={() => setAssetIdx(i)}>
                                    <RenderFile key={a._id} file={a} project_id={project_id} />
                                </div>)}
                        </div>
                    </div>
                    <BiRightArrowAlt className={getStyles(`next-asset ${idx + 1 === Assets.length ? 'disabled' : ''}`)} 
                        size={28} onClick={() => changeIdx(1)} title="Next asset" />
                </div>
            </div>
        </div>
    )
}

export default AssetsListViewer