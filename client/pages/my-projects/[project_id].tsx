import { useRouter } from 'next/router'
// types
import { FC } from 'react'
import { SharedProjectsResponseType } from '../../types/data/invention.types'
// redux
import { useAppSelector } from '../../hooks/redux'
import { userSelector } from '../../redux/features/user'
// utils
import { findInvention } from '../../utils/inventions.utils'
// components
import Loading from '../../components/global/loading'
import InventionViewer from '../invention/[project_id]'


const InventionViewerWrapper: FC = () => {
    // states
    const { User } = useAppSelector(userSelector)
    const Invention: SharedProjectsResponseType = findInvention(User, useRouter().query.project_id as string)
    // return <inventions> component with given data
    if (Invention.CreatorData && Invention.Project) return <InventionViewer Invention={Invention} />
    else return <Loading />
}

export default InventionViewerWrapper