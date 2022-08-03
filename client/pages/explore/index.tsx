import { useRouter } from 'next/router'
import React, { FC, useEffect, useRef} from 'react'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { inventionActions, inventionSelector } from '../../redux/features/invention'
// icons
import { AiOutlineSearch } from 'react-icons/ai'
// components
import Head from 'next/head'
import UserResult from '../../components/explore/result'
// utils
import { isValidString } from '../../utils/others/validateString'
// styles
import styles from '../../styles/pages/explore.module.css'
import Loading from '../../components/global/loading'


const Explore: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const list_ref = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const uri_query = router.query['query'] as string
    // data
    const { Data, eol, isLoading, query } = useAppSelector(inventionSelector).SearchData
    // handlers
    const loadMoreHandler = async () => {
        const e = list_ref?.current
        if (e && e.scrollHeight - e.scrollTop <= e.clientHeight + 1 && !eol)
            dispatch(inventionActions.searchByQuery({query, loadMore: true}))
    }
    const onEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isValidString(e.target.value, { noSpaces: true })) {
            router.push(`?query=${encodeURIComponent(e.target.value)}`, null, {shallow: true})
            dispatch(inventionActions.searchByQuery({query: e.target.value}))
            e.target.blur()
        }
        else if (e.key === 'Escape') {
            e.target.blur()
        }
    }

    // -- load first results with the initial uri-query
    useEffect(() => {
        if (uri_query)
            dispatch(inventionActions.searchByQuery({query: decodeURIComponent(uri_query)}))
    }, [uri_query])
    
    return (
        <main className={styles["Explore"]}>
            <Head>
                <title>Explore - Innovation</title>
            </Head>
            <div className={styles["explore-input-wrapper"]}>
                <div className={styles["explore-input"]}>
                    <input type="text" defaultValue={uri_query} placeholder="Search people, friends or inventions"
                        onKeyUp={onEnterSearch} autoFocus />
                    <AiOutlineSearch className={styles['icon-search']} size={22} />
                </div>
                {query && <p className={styles["results-counter"]}>
                    {isLoading
                        ? <Loading width='1.35rem' />
                        : `${Data.length || 'No'} result${Data.length!==1?'s':''}`}
                </p>}
            </div>
            <div className={styles["content"]} ref={list_ref} onScroll={loadMoreHandler}>
                {Data.map(sd => <UserResult key={sd._id} data={sd} />)}
            </div>
        </main>
    )
}


export default Explore