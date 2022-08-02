// actions file for user

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
// types
import { CLIENT_URIS } from '../../../configs/_client'
import { UserActionTypes } from './user.types'
// actions (from other reducers)
import { pushFeedback } from '../ui/ui.actions'
// api
import * as userAPI from '../../../utils/api/requests/user.api'


// async action: fetch user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const res = await userAPI.fetchUserData({})
    return res.data
})


// async action: follow/unfollow user
export const follow = createAsyncThunk('user/follow', async ({ action, target_user }: UserActionTypes['follow'], options) => {
    try {
        const res = await userAPI.follow({ action, target_user })
        // -- push success feedback
        options.dispatch(pushFeedback({ status: true, msg: res.msg }))
        return { action, user: res.data }
    }
    catch (err) {
        if (err.response?.status === 403) {
            // -- push error feedback (access denied)
            options.dispatch(pushFeedback({
                status: false,
                msg: "Can't follow users while not logged in",
                redirect: { uri: CLIENT_URIS.LOGIN }
            }))
            return options.rejectWithValue({})
        }
        else {
            // -- push error feedback
            options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
            return options.rejectWithValue({})
        }
    }
})


// async action: login
export const login = createAsyncThunk('user/login', async (data: UserActionTypes['login'], options) => {
    try {
        const res = await userAPI.login(data)
        // -- push success feedback
        options.dispatch(pushFeedback({ status: true, msg: res.msg }))
        return res.data
    }
    catch (err) {
        // -- push error feedback
        options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
        return options.rejectWithValue({})
    }
})


// async action: login
export const register = createAsyncThunk('user/register', async (data: UserActionTypes['register'], options) => {
    try {
        const res = await userAPI.register(data)
        // -- push success feedback
        options.dispatch(pushFeedback({ status: true, msg: res.msg }))
        return res.data
    }
    catch (err) {
        // -- push error feedback
        options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
        return options.rejectWithValue({})
    }
})


// async action: login
export const updateUser = createAsyncThunk('user/update', async (data: UserActionTypes['updateUser'], options) => {
    try {
        const res = await userAPI.updateUser(data)
        // -- push success feedback & redirect to profile
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


// async action: send new invention
export const createInvention = createAsyncThunk('invention/newInvention',
    async ({ data }: UserActionTypes['createInvention'], options) => {
        try {
            const res = await userAPI.createInvention({ data })
            // -- push success feedback & redirect to dashboard
            options.dispatch(pushFeedback({
                status: true,
                msg: res.msg,
                redirect: { uri: CLIENT_URIS.DASHBOARD, shallow: true }
            }))
            return res.data
        }
        catch (err) {
            // -- push error feedback
            options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
            return options.rejectWithValue({})
        }
    })


// action: update-invention
export const updateInvention = createAction<UserActionTypes['updateInvention']>('user/updateInvention')

// action: update-invention
export const assetActions = {
    upload: createAction<UserActionTypes['assets']['upload']>('user/uploadAsset'),
    delete: createAction<UserActionTypes['assets']['delete']>('user/deleteAsset')
}


// async action: send new invention
export const inviteToProject = createAsyncThunk('invention/inviteToProject',
    async (data: UserActionTypes['inviteToProject'], options) => {
        try {
            const res = await userAPI.inviteToProject(data)
            // -- push success feedback
            options.dispatch(pushFeedback({ status: true, msg: res.msg }))
            return res.data
        }
        catch (err) {
            // -- push error feedback
            options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? err.message ?? "An error has occured" }))
            return options.rejectWithValue({})
        }
    })