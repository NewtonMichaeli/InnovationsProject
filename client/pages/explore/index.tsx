import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
// types
import { SearchSSRType, SearchType } from '../../types/pages/search.type'
// utils
import { searchByQuery } from '../../utils/api/user.api'
// icons
import { AiOutlineSearch } from 'react-icons/ai'
// styles
import styles from '../../styles/pages/explore.module.css'
import { MinifiedUserType } from '../../redux/features/user/user.types'
import UserResult from '../../components/explore/result'


const Explore: FC<SearchType> = ({query, SearchData}) => {
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
        <div className={styles["Explore"]}>
            <div className={styles["explore-input-wrapper"]}>
                <div className={styles["explore-input"]}>
                    <input type="text" defaultValue={searchQuery} placeholder="Search people, friends or inventions" 
                        onChange={e => setSearchQuery(e.target.value)} onKeyUp={onEnterSearch} autoFocus />
                    <AiOutlineSearch className={styles['icon-search']} size={22} />
                </div>
            </div>
            <div className={styles["content"]}>
                {query && <p className={styles["results-counter"]}>{SearchData.length || 'No'} result{SearchData.length!==1?'s':''}</p>}
                {SearchData.map(sd => <UserResult key={sd._id} data={sd} />)}
            </div>
        </div>
    )
}


export const getServerSideProps: SearchSSRType = async (context) => {
    // get search-query parameter (optionl)
    const { query } = context.query
    let SearchData: MinifiedUserType[]

    if (query) {
        try {
            const res = await searchByQuery(query, 20)
            SearchData = res.data
        }
        catch (err) { /* search failed for unknown reason */ }
    }

    console.log('sd: ', SearchData)
    return {
        props: {
            query: query ?? '',
            SearchData: SearchData ?? []
        }
    }
}

export default Explore