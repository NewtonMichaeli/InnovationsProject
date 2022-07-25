// types for invention page

import { SharedProjectsResponseType } from "../../redux/features/user/user.types"
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export interface InventionPageProps {
    Invention: SharedProjectsResponseType | null,
}

export type InventionPageSSR = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<InventionPageProps>>