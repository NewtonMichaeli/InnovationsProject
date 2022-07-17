// types for search page

import { MinifiedUserType } from "../../redux/features/user/user.types"

export interface SearchType {
    query: string
    SearchData: MinifiedUserType[]
}

export type SearchSSRType = (context: any) => Promise<{ props: SearchType }>