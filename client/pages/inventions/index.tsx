import Head from 'next/head'
import { FC, useEffect } from 'react'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSelector, userActions } from '../../redux/features/user'
// styles


const Home: FC = () => {

    const dispatch = useAppDispatch()
    const { User, isLoading } = useAppSelector(userSelector)
  
    //   useEffect(() => {
    //     dispatch(userActions.fetchUserData())
    //   }, [])

    return (
        <div>
            <Head>
                <title>Innovations - dashboard</title>
                <meta name="description" content="Inventions Home Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {
                isLoading 
                    ? <h4>Loading..</h4> 
                    : User && <>
                    <h1>{User.Username}</h1>
                    <h3>{User.Fname} {User.Sname}</h3>
                    <h4>{User.Email}</h4>
                    </>
                }
            </main>

            <footer></footer>
        </div>
    )
}


export default Home