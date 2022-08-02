import Link from 'next/link'
import {Dispatch, FC, useRef, KeyboardEvent, SetStateAction, useEffect} from 'react'
// types
import { AssetType } from '../../types/data/invention.types'
import { SERVER_URI__DOWNLOAD_ASSET, SERVER_URI__GET_ASSET } from '../../configs/_server'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
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
import { inventionActions, inventionSelector } from '../../redux/features/invention'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


const AssetDataSection: FC<{
    Asset: AssetType,
    project_id: string
}> = ({Asset, project_id}) => {
    // states
    const dispatch = useAppDispatch()
    // handlers
    const copyAssetLink = async () => {
        await navigator.clipboard.writeText(SERVER_URI__GET_ASSET(project_id, Asset.path))
        dispatch(uiActions.pushFeedback({status: true, msg: 'Asset copied to your clipboard!'}))
    }

    return (
        <div className={styles["asset-data"]}>
            <div className={styles["file"]}>
                <RenderFile detailed file={Asset} project_id={project_id} />
            </div>
            <p className={styles["asset-description"]}>{Asset.description}</p>
            {/* asset options */}
            <div className={styles["asset-options"]}>
                <HiOutlineLink size={26} title="Copy asset link" onClick={copyAssetLink} />
                <Link target={'_blank'} href={SERVER_URI__DOWNLOAD_ASSET(project_id, Asset.path)}>
                    <HiOutlineDownload size={26} title="Download asset" />
                </Link>
            </div>
        </div>
    )
}


const AssetsListViewer: FC<{
    Assets: AssetType[],
    project_id: string
}> = ({Assets, project_id}) => {
    // states
    const dispatch = useAppDispatch()
    const assets_list_ref = useRef(null)
    const { ViewAssetsIdx } = useAppSelector(inventionSelector)
    // handlers
    const setAssetIdx = (res: number) => dispatch(inventionActions.viewAssetsIdx(res))
    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case 'ArrowRight': return setAssetIdx(ViewAssetsIdx + 1)
            case 'ArrowLeft': return setAssetIdx(ViewAssetsIdx - 1)
            case 'Escape': return setAssetIdx(null)
        }
    }

    // effects
    useEffect(() => {
        if (assets_list_ref.current && ViewAssetsIdx !== null) {
            assets_list_ref.current.style.marginLeft = `${ViewAssetsIdx * -4.52 + 13}rem`
            assets_list_ref.current.scrollTo(0,0)
        }
    }, [assets_list_ref, ViewAssetsIdx])

    return (
        <div className={getStyles(`AssetsListViewer ${ViewAssetsIdx === null ? 'hide' : ''}`)} tabIndex={0} onKeyDown={onKeyDownHandler}>
            {/* go-back */}
            <GoBack className={styles["go-back-btn"]} onClick={() => setAssetIdx(null)} />
            <div className={styles["content"]}>
                {/* asset data section */}
                {ViewAssetsIdx !== null && <AssetDataSection Asset={Assets[ViewAssetsIdx]} project_id={project_id} />}
                {/* controller section */}
                <div className={styles["controllers"]}>
                    <BiLeftArrowAlt className={getStyles(`prev-asset ${ViewAssetsIdx === 0 ? 'disabled' : ''}`)} 
                        size={28} onClick={() => setAssetIdx(ViewAssetsIdx - 1)} title="Previous asset" />
                    <div className={styles["assets"]}>
                        <div className={styles["list"]} ref={assets_list_ref}>
                            {Assets.map((a,i) => 
                                <div className={styles["file-btn"]} onClick={() => setAssetIdx(i)}>
                                    <RenderFile key={a._id} file={a} project_id={project_id} />
                                </div>)}
                        </div>
                    </div>
                    <BiRightArrowAlt className={getStyles(`next-asset ${ViewAssetsIdx + 1 === Assets.length ? 'disabled' : ''}`)} 
                        size={28} onClick={() => setAssetIdx(ViewAssetsIdx + 1)} title="Next asset" />
                </div>
            </div>
        </div>
    )
}

export default AssetsListViewer