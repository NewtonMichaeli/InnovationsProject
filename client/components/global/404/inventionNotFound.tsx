import Head from "next/head"
import { FC } from "react"


const InventionNotFound: FC = () => {
    
    return (
        <div className={'404-InventionNotFound'}>
            <Head>
                <title>Invention not found - Innovation</title>
            </Head>
            Invention not found
        </div>
    )
}

export default InventionNotFound