import Head from "next/head"
import { FC } from "react"
// styles
import styles from '../../../styles/components/global/pageNotFound.module.css'


const PageNotFound: FC = () => {
    
    return (
        <div className={styles["PageNotFound"]}>
            <Head>
                <title>Page not found - Innovation</title>
            </Head>
            <div className={styles["text"]}>
                <h1>404</h1>
                <h4>Page not found</h4>
            </div>
        </div>
    )
}

export default PageNotFound