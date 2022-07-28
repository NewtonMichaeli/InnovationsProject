// actions file for user
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { SharedProjectsResponseType } from '../../../types/data/invention.types'

export type storeInvention__type = { Invention: SharedProjectsResponseType, my_user_id: string }
// action: store invention
export const storeInvention = createAction<storeInvention__type>('invention/storeInvention')