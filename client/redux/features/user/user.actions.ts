// actions file for user
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as userAPI from '../../../utils/api/requests/user.api'
// types
import { FormUserType, REGIONS_ENUM } from '../../../types/data/user.types'
import { ContributorType, FormInventionType } from '../../../types/data/invention.types'
import { pushFeedback } from '../ui/ui.actions'
import { CLIENT_URIS } from '../../../configs/_client'


// async action: fetch user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const res = await userAPI.fetchUserData({})
    return res.data
})


export type follow__type = { action: 'add' | 'remove', target_user: string }
// async action: follow/unfollow user
export const follow = createAsyncThunk('user/follow', async ({ action, target_user }: follow__type, options) => {
    try {
        const res = await userAPI.follow({ action, target_user })
        options.dispatch(pushFeedback({ status: true, msg: res.msg }))
        return { action, user: res.data }
    }
    catch (err) {
        if (err.response?.status === 403) {
            options.dispatch(pushFeedback({
                status: false,
                msg: "Can't follow users while not logged in",
                redirect: { uri: CLIENT_URIS.LOGIN }
            }))
            return options.rejectWithValue({})
        }
        else {
            options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
            return options.rejectWithValue({})
        }
    }
})


export type login__type = { Username: string, Password: string }
// async action: login
export const login = createAsyncThunk('user/login', async (data: login__type, options) => {
    try {
        const res = await userAPI.login(data)
        options.dispatch(pushFeedback({ status: true, msg: res.msg }))
        return res.data
    }
    catch (err) {
        options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
        return options.rejectWithValue({})
    }
})


export type register__type =
    { Username: string, Password: string, Fname: string, Sname: string, Email: string, Region: keyof typeof REGIONS_ENUM }
// async action: login
export const register = createAsyncThunk('user/register', async (data: register__type, options) => {
    try {
        const res = await userAPI.register(data)
        options.dispatch(pushFeedback({ status: true, msg: res.msg }))
        return res.data
    }
    catch (err) {
        options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
        return options.rejectWithValue({})
    }
})


export type updateUser__type = Partial<FormUserType>
// async action: login
export const updateUser = createAsyncThunk('user/update', async (data: updateUser__type, options) => {
    try {
        const res = await userAPI.updateUser(data)
        options.dispatch(pushFeedback({
            status: true,
            msg: res.msg,
            redirect: { uri: CLIENT_URIS.PROFILE, shallow: true }
        }))
        return res.data.new_data
    }
    catch (err) {
        options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
        return options.rejectWithValue({})
    }
})


// action: sign-out
export const signout = createAction('user/signout')


export type createInvention__type = { new_invention_data: FormInventionType }
// async action: send new invention
export const createInvention = createAsyncThunk('invention/newInvention', async (data: createInvention__type, options) => {
    try {
        const res = await userAPI.createInvention({ data: data.new_invention_data })
        options.dispatch(pushFeedback({
            status: true,
            msg: res.msg,
            redirect: { uri: CLIENT_URIS.DASHBOARD, shallow: true }
        }))
        return res.data
    }
    catch (err) {
        options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
        return options.rejectWithValue({})
    }
})


export type inviteToProject__type = { project_id: string, action: 'add' | 'remove', user_id: string, roles?: ContributorType['Roles'] }
// async action: send new invention
export const inviteToProject = createAsyncThunk('invention/inviteToProject', async (data: inviteToProject__type, options) => {
    try {
        const res = await userAPI.inviteToProject(data)
        options.dispatch(pushFeedback({ status: true, msg: res.msg }))
        return res.data
    }
    catch (err) {
        options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
        return options.rejectWithValue({})
    }
})