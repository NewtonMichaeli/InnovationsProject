// actions file for user
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as userAPI from '../../../utils/api/user.api'
// types
import { UserType } from './user.types'

// async action: fetch user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const res = await userAPI.fetchUserData()
    return res.data as UserType
})

type follow__type = { action: 'add' | 'remove', target_user: string }
// async action: follow/unfollow user
export const follow = createAsyncThunk('user/follow', async ({ action, target_user }: follow__type) => {
    const res = await userAPI.follow(action, target_user)
    return { action, target_user }
})