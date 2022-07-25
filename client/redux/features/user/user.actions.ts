// actions file for user
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as userAPI from '../../../utils/api/requests/user.api'
// types
import { REGIONS_ENUM, UserType } from './user.types'

// async action: fetch user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const res = await userAPI.fetchUserData({})
    return res.data
})

export type follow__type = { action: 'add' | 'remove', target_user: string }
// async action: follow/unfollow user
export const follow = createAsyncThunk('user/follow', async ({ action, target_user }: follow__type) => {
    const res = await userAPI.follow({ action, target_user })
    return { action, user: res.data }
})

export type login__type = { Username: string, Password: string }
// async action: login
export const login = createAsyncThunk('user/login', async (data: login__type) => {
    const res = await userAPI.login(data)
    return res.data
})

export type register__type = { Username: string, Password: string, Fname: string, Sname: string, Email: string, Region: REGIONS_ENUM }
// async action: login
export const register = createAsyncThunk('user/register', async (data: register__type) => {
    const res = await userAPI.register(data)
    return res.data
})

export type updateUser__type =
    { Username?: string, Profile_Pic?: number, Fname?: string, Sname?: string, Email?: string, Region?: REGIONS_ENUM }
// async action: login
export const updateUser = createAsyncThunk('user/update', async (data: updateUser__type) => {
    if (Object.keys(data).length === 0) throw Error("Nothing to update")
    const res = await userAPI.updateUser(data)
    return res.data.new_data
})

// action: sign-out
export const signout = createAction('user/signout')