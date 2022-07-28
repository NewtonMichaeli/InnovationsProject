// types for invention page

import { SharedProjectsResponseType } from "../data/invention.types"
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export interface InventionPageProps {
    Invention: SharedProjectsResponseType | null,
}

export type InventionPageSSR = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<InventionPageProps>>