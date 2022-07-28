// types for explore page

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { MinifiedUserType } from '../data/user.types'

export interface ExplorePageProps {
    query: string
    SearchData: MinifiedUserType[]
}

export type ExplorePageSSR = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<ExplorePageProps>>