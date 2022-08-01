// actions file for user
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UploadAssetType, SharedProjectsResponseType, UpdateInventionType } from '../../../types/data/invention.types'
import { pushFeedback } from '../ui/ui.actions'
import { updateInvention as updateUserInvention, uploadAsset as uploadUserInventionAsset } from '../user/user.actions'
import * as inventionAPI from '../../../utils/api/requests/invention.api'
import { CLIENT_URIS } from '../../../configs/_client'


export type storeInvention__type = { Invention: SharedProjectsResponseType, my_user_id?: string }
// action: store invention
export const storeInvention = createAction<storeInvention__type>('invention/storeInvention')


export type updateInvention__type = { updated_invention_data: UpdateInventionType, project_id: string }
// async action: update invention data
export const updateInvention = createAsyncThunk('invention/updateInvention', async (data: updateInvention__type, options) => {
    try {
        const res = await inventionAPI.updateInvention({ project_id: data.project_id, data: data.updated_invention_data })
        // -- update user state with updated invention
        options.dispatch(updateUserInvention(res.data))
        // -- push success feedback
        options.dispatch(pushFeedback({
            status: true,
            msg: res.msg,
            redirect: { uri: CLIENT_URIS.DASHBOARD, shallow: true }
        }))
        return res.data
    }
    catch (err) {
        // -- push error feedback & redirect to home
        options.dispatch(pushFeedback({
            status: false,
            msg: err.response?.data.msg ?? err.message ?? "An error has occured",
            redirect: { uri: CLIENT_URIS.HOME }
        }))
        return options.rejectWithValue({})
    }
})


export type uploadAsset__type = { project_id: string, data: UploadAssetType }
// async action: update invention data
export const uploadAsset = createAsyncThunk('invention/uploadAsset', async (data: uploadAsset__type, options) => {
    try {
        const res = await inventionAPI.uploadAsset({ project_id: data.project_id, data: data.data })
        // -- update user state with updated assets
        options.dispatch(uploadUserInventionAsset(res.data))
        // -- push success feedback
        options.dispatch(pushFeedback({
            status: true,
            msg: res.msg,
            redirect: { uri: CLIENT_URIS.DASHBOARD, shallow: true }
        }))
        return res.data
    }
    catch (err) {
        // -- push error feedback
        options.dispatch(pushFeedback({
            status: false,
            msg: err.response?.data.msg ?? err.message ?? "An error has occured"
        }))
        return options.rejectWithValue({})
    }
})