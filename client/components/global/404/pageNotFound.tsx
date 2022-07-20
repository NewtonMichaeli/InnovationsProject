import Head from "next/head"
import { FC } from "react"


const PageNotFound: FC = () => {
    
    return (
        <div className={'404-PageNotFound'}>
            <Head>
                <title>Page not found - Innovation</title>
            </Head>
            Page not found
        </div>
    )
}

export default PageNotFound