// types for search page

import { GetServerSidePropsContext } from 'next'
import { MinifiedUserType } from "../../redux/features/user/user.types"

export interface SearchPageProps {
    query: string
    SearchData: MinifiedUserType[]
}

export type SearchPageSSR = (context: GetServerSidePropsContext) => Promise<{ props: SearchPageProps }>