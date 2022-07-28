// actions file for user
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as userAPI from '../../../utils/api/requests/user.api'
// types
import { FormUserType, REGIONS_ENUM } from '../../../types/data/user.types'
import { ContributorType, FormInventionType } from '../../../types/data/invention.types'

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

export type register__type =
    { Username: string, Password: string, Fname: string, Sname: string, Email: string, Region: keyof typeof REGIONS_ENUM }
// async action: login
export const register = createAsyncThunk('user/register', async (data: register__type) => {
    const res = await userAPI.register(data)
    return res.data
})

export type updateUser__type = Partial<FormUserType>
// async action: login
export const updateUser = createAsyncThunk('user/update', async (data: updateUser__type) => {
    if (Object.keys(data).length === 0) throw Error("Nothing to update")
    const res = await userAPI.updateUser(data)
    return res.data.new_data
})

// action: sign-out
export const signout = createAction('user/signout')

export type createInvention__type = { new_invention_data: FormInventionType }
// async action: send new invention
export const createInvention = createAsyncThunk('invention/newInvention', async ({ new_invention_data }: createInvention__type) => {
    const res = await userAPI.createInvention({ data: new_invention_data })
    return res.data
})

export type inviteToProject__type = { project_id: string, action: 'add' | 'remove', user_id: string, roles?: ContributorType['Roles'] }
// async action: send new invention
export const inviteToProject = createAsyncThunk('invention/inviteToProject', async (data: inviteToProject__type) => {
    const res = await userAPI.inviteToProject(data)
    return res.data
})