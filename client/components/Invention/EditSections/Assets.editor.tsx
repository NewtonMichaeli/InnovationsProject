import Head from 'next/head'
// types
import { FC, MouseEvent, SetStateAction, useState } from 'react'
import { AssetType, UploadAssetType } from '../../../types/data/invention.types'
// redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { inventionActions, inventionSelector } from '../../../redux/features/invention'
// icons
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
// components
import RenderFile from '../../shared/file-renderer'
import GoBack from '../../shared/GoBack'
// styles
import styles from '../../../styles/components/Invention/EditSections/assets.module.css'
import { getModuleStylesMethod } from '../../../utils/styles.utils'
import { pushFeedback } from '../../../redux/features/ui/ui.actions'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)

const AssetItem: FC<{
    Asset: AssetType,
    idx: number,
}> = ({Asset, idx}) => {
    // states
    const dispatch = useAppDispatch()
    const { Invention } = useAppSelector(inventionSelector)
    // handlers
    const setIdx = () => dispatch(inventionActions.viewAssetsIdx(idx))
    const deleteAssetHandler = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        await dispatch(inventionActions.deleteAsset({asset_id: Asset._id, project_id: Invention.Project._id}))
    }

    return (
        <div className={styles["Asset"]} title="Open Asset" onClick={setIdx}>
            <div className={styles["file"]}>
                <RenderFile project_id={Invention.Project._id} file={Asset} />
            </div>
            <div className={styles["data"]}>
                <h4 className={styles["uploader"]}>{Asset.src.Username}</h4>
                <p className={styles["description"]}>{Asset.description}</p>
            </div>
            <div className={styles["delete-asset"]} title="Delete asset" onClick={deleteAssetHandler}>
                <IoMdClose size={28} color="#222" />
            </div>
        </div>
    )
}


const Assets_EditSection: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { Invention } = useAppSelector(inventionSelector)
    const [sliceIdx, setSliceIdx] = useState(6)
    // data
    const [data, setData] = useState<UploadAssetType>({
        file: null,
        description: ''
    })
    // handlers
    const submitHandler = async (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        try {
            await dispatch(inventionActions.uploadAsset({data, project_id: Invention.Project._id}))
            setData({description: '', file: null})    // -- reset data
        }
        catch (err) {
            dispatch(pushFeedback({status: false, msg: err.message ?? "An error has occured"}))
        }
    }

    return (
        <section className={styles["Assets"]}>
            <Head>
                {/* <title>Assets - Innovation</title> */}
            </Head>
            {/* go-back */}
            <GoBack />
            <div className={styles["content"]}>
                {/* header */}
                <div className={styles["header"]}>
                    <h3>Assets</h3>
                    <p>Your project-related assets, uploaded by you and your group members.</p>
                </div>
                {/* upload assets form */}
                <form className={styles["upload-asset-form"]}>
                    <div className={getStyles(`input-file ${data.file ? 'valid' : ''}`)}>
                        <AiOutlineCloudUpload className={styles["icon"]} size={40} />
                        <p>Drag & Drop your Asset here</p>
                        <input type="file" name="file" id="File" onChange={e => setData({...data, file: e.target.files?.[0]})} />
                    </div>
                    <div className={getStyles(`input-description ${data.description.length > 2 ? 'valid' : ''} ${data.file ? '' : 'hidden-step'}`)}>
                        <BsArrowRight className={styles["arrow-step-indicator"]} size={40} />
                        <textarea name="description" id="Description" placeholder='Enter some description'
                            onChange={e => setData({...data, description: e.target.value})} />
                    </div>
                    <div className={getStyles(`input-submit ${data.description.length > 2 ? '' : 'hidden-step'}`)}>
                        <BsArrowRight className={styles["arrow-step-indicator"]} size={40} />
                        <input type="submit" value="Upload" onClick={submitHandler} />
                    </div>
                </form>
                {/* assets list */}
                <div className={styles["assets-list"]}>
                    {Invention.Project.Assets
                        .slice(0, sliceIdx)
                        .map((a,i) => <AssetItem key={a._id} Asset={a} idx={i} />)}
                    {sliceIdx < Invention.Project.Assets.length &&
                        <span className={styles["show-more-assets-btn"]} onClick={() => setSliceIdx(s => s + 6)}>Show more</span>}
                </div>
            </div>
        </section>
    )
}

export default Assets_EditSection