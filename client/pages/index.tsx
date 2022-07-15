import Head from 'next/head'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { IconType } from 'react-icons'
import { CLIENT_URIS } from '../configs/_client'
// icons
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import { BiStats, BiUser } from 'react-icons/bi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { userSelector, userActions } from '../redux/features/user'
// styles
import styles from '../styles/pages/home.module.css'


// app-link component
const AppLink: FC<{to: string, title: string, Icon: IconType}> = ({to, title, Icon}) => (
  <Link href={to}>
    <div className={styles["app"]}>
      <div className={styles["app-icon-container"]}>
        <Icon size={41} color='#111' />
      </div>
      <span className={styles['app-title']}>{title}</span>
    </div> 
  </Link>
)


// Home page component
const Home: FC = () => {

  // States
  const { User } = useAppSelector(userSelector)
  // -- description essential data
  const all_inventions = [...User.Inventions, ...User.Shared_Projects.map(sp => sp.Project)]
  const descriptionData = {
    personalProjectsAmount: User.Inventions.length,
    sharedProjectsAmount: User.Shared_Projects.length,
    finishedProjects: all_inventions.filter(p => p.Status === 'finished').length
  }

  return (
    <main className={styles['Home']}>
      <Head>
        <title>Innovations - Home</title>
        <meta name="description" content="Inventions Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles["home-header"]}>
        {/* title */}
        <h1 className={styles['home-title']}>Welcome, {User?.Fname}</h1>
        {/* description */}
        <span className={styles['home-description']}>
          <h4 className={styles['inventions-info']}>
            You have {descriptionData.sharedProjectsAmount} shared project{descriptionData.sharedProjectsAmount!==1?'s':''} and {descriptionData.personalProjectsAmount} Personal project{descriptionData.personalProjectsAmount!==1?'s':''}, {descriptionData.finishedProjects || 'None'} of them {descriptionData.finishedProjects === 1 ? 'is' : 'are'} complete.
          </h4>
          <Link href={'/my-projects'}>
            <a className={styles['link-my-projects']}>Check them out.</a>
          </Link>
        </span>
      </div>

      <div className={styles["apps"]}>
        <AppLink to='/my-projects' title='Inventions' Icon={MdOutlineSpaceDashboard} />
        <AppLink to='/profile' title='Profile' Icon={BiUser} />
        <AppLink to='/explore' title='Explore' Icon={AiOutlineSearch} />
        <AppLink to='/statistics' title='Statistics' Icon={BiStats} />
        <AppLink to='/settings' title='Settings' Icon={AiOutlineSetting} />
      </div>
    </main>
  )
}


export default Home