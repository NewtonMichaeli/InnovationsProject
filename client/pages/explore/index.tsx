import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
// types
import { ExplorePageSSR, ExplorePageProps } from '../../types/pages/explore.type'
import { MinifiedUserType } from '../../types/data/user.types'
// utils
import { searchByQuery } from '../../utils/api/requests/user.api'
// icons
import { AiOutlineSearch } from 'react-icons/ai'
// components
import Head from 'next/head'
import UserResult from '../../components/explore/result'
// styles
import styles from '../../styles/pages/explore.module.css'


const Explore: FC<ExplorePageProps> = ({query, SearchData}) => {
    // states
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState(decodeURIComponent(query))
    // handlers
    const onEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim().length) {
            router.push(`?query=${encodeURIComponent(searchQuery)}`)
            e.target.blur()
        }
        else if (e.key === 'Escape') {
            e.target.blur()
        }
    }
    
    return (
        <main className={styles["Explore"]}>
            <Head>
                <title>Explore - Innovation</title>
            </Head>
            <div className={styles["explore-input-wrapper"]}>
                <div className={styles["explore-input"]}>
                    <input type="text" defaultValue={searchQuery} placeholder="Search people, friends or inventions" 
                        onChange={e => setSearchQuery(e.target.value)} onKeyUp={onEnterSearch} autoFocus />
                    <AiOutlineSearch className={styles['icon-search']} size={22} />
                </div>
                {query && <p className={styles["results-counter"]}>{SearchData.length || 'No'} result{SearchData.length!==1?'s':''}</p>}
            </div>
            <div className={styles["content"]}>
                {SearchData.map(sd => <UserResult key={sd._id} data={sd} />)}
            </div>
        </main>
    )
}


// Fetch serach data before loading page
export const getServerSideProps: ExplorePageSSR = async context => {
    // get search-query parameter (optionl)
    const query = context.query['query'] as string
    let SearchData: MinifiedUserType[]

    if (query) {
        try {
            const res = await searchByQuery({query, limit: 20})
            SearchData = res.data
        }
        catch (err) { /* search failed for unknown reason */ }
    }

    return {
        props: {
            query: query as string ?? '',
            SearchData: SearchData ?? []
        }
    }
}


export default Explore