// types for user page

import { UserType } from "../../redux/features/user/user.types"
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export interface UserPageProps {
    UserData: UserType | null
}

export type UserPageSSR = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<UserPageProps>>