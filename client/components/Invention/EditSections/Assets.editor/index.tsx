import Head from 'next/head'
// types
import { FC, useState } from 'react'
// redux
import { useAppSelector } from '../../../../hooks/redux'
import { inventionSelector } from '../../../../redux/features/invention'
// components
import GoBack from '../../../shared/GoBack'
import ResponsiveForm from './ResponsiveForm'
import AssetItem from './AssetItem'
// styles
import styles from '../../../../styles/components/Invention/EditSections/assets.module.css'


const Assets_EditSection: FC = () => {
    // states
    const { Assets } = useAppSelector(inventionSelector).Invention?.Project
    const [sliceIdx, setSliceIdx] = useState(6)

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
                <ResponsiveForm />
                {/* assets list */}
                <div className={styles["assets-list"]}>
                    {Assets
                        .slice(0, sliceIdx)
                        .map((a,i) => <AssetItem key={a._id} Asset={a} idx={i} />)}
                    {sliceIdx < Assets.length &&
                        <span className={styles["show-more-assets-btn"]} onClick={() => setSliceIdx(s => s + 6)}>Show more</span>}
                </div>
            </div>
        </section>
    )
}

export default Assets_EditSection