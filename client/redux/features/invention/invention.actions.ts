// actions file for user
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as userAPI from '../../../utils/api/requests/user.api'
import { SharedProjectsResponseType } from '../user/user.types'
// types

export type storeInvention__type = { Invention: SharedProjectsResponseType, my_user_id: string }
// action: store invention
export const storeInvention = createAction<storeInvention__type>('invention/storeInvention')