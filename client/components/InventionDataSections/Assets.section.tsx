import { FC } from 'react'
import { AssetType } from '../../redux/features/user/user.types'
// icons
import { FiEdit3 } from 'react-icons/fi'
import { GrFormView } from 'react-icons/gr'
// styles
import styles from '../../styles/components/InventionsDataSection/assets.module.css'
import RenderFile from '../../utils/file-renderer'


// components:

const NoAssets: FC = () => (
    // -- load when no assets exist
    <div className={styles["no-assets"]}>
        <h4 className={styles["title"]}>This project doesn't have any Assets.</h4>
        <h3 className={styles["add-asset"]}>+ Add asset</h3>
    </div>
)
const EmptyCells: FC<{amount: number}> = ({amount}) =>  (amount ? <>{
    // -- load when less the 4 assets are rendered - fill all blank spots
    Array.apply(null, Array(amount)).map((v,i) => <span key={i} className={styles["empty-cell"]}></span>)
}</> : <></>)
const CounterCell: FC<{assetsLeft: number}> = ({assetsLeft}) => (
    // -- load when 4+ assets exist - show amount of total assets instead of renderung them all
    <span className={styles["counter-cell"]}>+{assetsLeft}</span>
)


// Input: assets-array, username, project_id
// Output: A grid of assets (4 at most)
const AssetsGrid: FC<{
    Assets: AssetType[],
    username: string,
    project_id: string
}> = ({Assets, username, project_id}) => {

    // render assets evenly in a grid container:
    switch (Assets.length) {
        case 0: return <NoAssets />
        // cases 1-4: devide assets equally an fill the blank areas
        case 1:
        case 2:
        case 3:
        case 4: return <>
            {Assets.slice(0, Assets.length).map((f,i) => 
                <RenderFile key={i} username={username} project_id={project_id} file={f} />)}
            <EmptyCells amount={4 - Assets.length} />
        </>
        // case 5+: show first 4 assets and indicate the remaining amount of assets
        default: return <>
            {Assets.slice(0, 4).map((f, i) => 
                <RenderFile key={i} username={username} project_id={project_id} file={f} />)}
            <CounterCell assetsLeft={Assets.length - 3} />
        </>
    }
}


const AssetsSection: FC<{
    Assets: AssetType[],
    username: string,
    project_id: string
}> = ({Assets, project_id, username}) => {

    return (
        <section className={styles["assets-section"]}>
            <div className={styles["section-header"]}>
                <h3>Assets</h3>
                <FiEdit3 className={styles['edit']} size={20} />
            </div>
            <div className={styles["content"]}>
                <AssetsGrid Assets={Assets} project_id={project_id} username={username} />
                {/* watch button (if at least 1 asset exists) */}
                {
                    Assets.length
                        ? <div className={styles["watch-btn"]} title="View Assets"><GrFormView size={28} /></div>
                        : <></>
                }
            </div>
        </section>
    )
}

export default AssetsSection
