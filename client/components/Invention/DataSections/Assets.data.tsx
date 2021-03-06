// types
import { FC } from 'react'
import { AssetType } from '../../../redux/features/user/user.types'
import { INVENTION_USER_ROLES } from '../../../configs/_client'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { inventionSelector } from '../../../redux/features/invention'
// icons
import { GrFormView } from 'react-icons/gr'
// components
import RenderFile from '../../shared/file-renderer'
import EditSectionBtn from '../../shared/EditInventionSection'
// styles
import styles from '../../../styles/components/Invention/DataSections/assets.module.css'


// components:

const NoAssets: FC = () => (
    // -- load when no assets exist
    <div className={styles["no-assets"]}>
        <h4 className={styles["title"]}>This project doesn't have any Assets.</h4>
        <h3 className={styles["add-asset"]}>+ Add an asset</h3>
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
    project_id: string
}> = ({Assets, project_id}) => {

    // render assets evenly in a grid container:
    switch (Assets.length) {
        case 0: return <NoAssets />
        // cases 1-4: devide assets equally an fill the blank areas
        case 1:
        case 2:
        case 3:
        case 4: return <>
            {Assets.slice(0, Assets.length).map((f,i) => 
                <RenderFile key={i} project_id={project_id} file={f} />)}
            <EmptyCells amount={4 - Assets.length} />
        </>
        // case 5+: show first 4 assets and indicate the remaining amount of assets
        default: return <>
            {Assets.slice(0, 4).map((f, i) => 
                <RenderFile key={i} project_id={project_id} file={f} />)}
            <CounterCell assetsLeft={Assets.length - 3} />
        </>
    }
}


const Assets_DataSection: FC = () => {
    // states
    const { Invention } = useAppSelector(inventionSelector)

    return (
        <section className={styles["assets-section"]}>
            <div className={styles["section-header"]}>
                <h3>Assets</h3>
                {/* edit if either creator or contributor */}
                <EditSectionBtn className={styles["edit"]} section='assets' excludeRole={INVENTION_USER_ROLES.OBSERVER} />
            </div>
            <div className={styles["content"]}>
                <AssetsGrid Assets={Invention.Project.Assets} project_id={Invention.Project._id} />
                {/* watch button (if at least 1 asset exists) */}
                {
                    Invention.Project.Assets.length
                        ? <div className={styles["watch-btn"]} title="View Assets"><GrFormView size={28} /></div>
                        : <></>
                }
            </div>
        </section>
    )
}

export default Assets_DataSection