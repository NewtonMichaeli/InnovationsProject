import { FC } from 'react'
// styles
import styles from '../../styles/components/InventionsDataSection/aboutyou.module.css'


const AboutYouSection: FC<{
    isCreator: boolean,
    roles: string[]
}> = ({isCreator, roles}) => {

    // roles = ['DevOps', 'UI/X', 'Database Maintainance', 'Design Manager', 'Design']
    return (
        <section className={styles["aboutyou-section"]}>
            <div className={styles["section-header"]}>
                <h3>About you</h3>
            </div>
            <div className={styles["content"]}>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>You are:</h5>
                    <h3 className={styles['data-text']}>{isCreator ? 'Creator' : 'Contributor'}</h3>
                </div>
                <div className={styles["data-group"]}>
                    <h5 className={styles['label']}>Roles:</h5>
                    {roles.length
                        ? <h3 className={styles['list']}>{roles.map(r => <code>{r}</code>)}</h3>
                        : <h3 className={styles['data']}>None</h3>
                    }
                </div>
            </div>
        </section>
    )
}

export default AboutYouSection