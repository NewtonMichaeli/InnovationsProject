// types
import { FC, MouseEvent } from "react"
import { AssetType } from "../../../../types/data/invention.types"
// redux
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { inventionActions, inventionSelector } from "../../../../redux/features/invention"
// icons
import { IoMdClose } from "react-icons/io"
// components
import RenderFile from "../../../shared/file-renderer"
// styles
import styles from '../../../../styles/components/Invention/EditSections/assets.module.css'


/**
 * @param Asset an asset
 * @returns a component, rendering it's given asset
 */
 const AssetItem: FC<{
    Asset: AssetType,
    idx: number,
}> = ({Asset, idx}) => {
    // states
    const dispatch = useAppDispatch()
    const project_id = useAppSelector(inventionSelector).Invention?.Project._id
    // handlers
    const setIdx = () => dispatch(inventionActions.viewAssetsIdx(idx))
    const deleteAssetHandler = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        await dispatch(inventionActions.deleteAsset({asset_id: Asset._id, project_id}))
    }

    return (
        <div className={styles["Asset"]} title="Open Asset" onClick={setIdx}>
            <div className={styles["file"]}>
                <RenderFile project_id={project_id} file={Asset} />
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

export default AssetItem