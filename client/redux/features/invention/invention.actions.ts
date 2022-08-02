// actions file for user

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
// types
import { CLIENT_URIS } from '../../../configs/_client'
import { InventionActionTypes } from './invention.types'
// actions (from other reducers)
import { updateInvention as updateUserInvention, assetActions as assetUserActions } from '../user/user.actions'
import { pushFeedback } from '../ui/ui.actions'
// api
import * as inventionAPI from '../../../utils/api/requests/invention.api'


// action: store invention
export const storeInvention = createAction<InventionActionTypes['storeInvention']>('invention/storeInvention')


// async action: update invention data
export const updateInvention = createAsyncThunk('invention/updateInvention',
    async (data: InventionActionTypes['updateInvention'], options) => {
        try {
            const res = await inventionAPI.updateInvention(data)
            // -- update user state with updated invention
            options.dispatch(updateUserInvention(res.data))
            // -- push success feedback
            options.dispatch(pushFeedback({
                status: true,
                msg: res.msg,
                redirect: { uri: CLIENT_URIS._INVENTION(data.project_id), shallow: true }
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


// async action: update invention data
export const uploadAsset = createAsyncThunk('invention/uploadAsset',
    async ({ data, project_id }: InventionActionTypes['asset']['upload'], options) => {
        try {
            const res = await inventionAPI.uploadAsset({ project_id, data })
            // -- update user state with updated assets
            options.dispatch(assetUserActions.upload({ data: res.data, project_id }))
            // -- push success feedback
            options.dispatch(pushFeedback({ status: true, msg: res.msg }))
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


// async action: update invention data
export const deleteAsset = createAsyncThunk('invention/deleteAsset',
    async ({ asset_id, project_id }: InventionActionTypes['asset']['delete'], options) => {
        try {
            const res = await inventionAPI.deleteAsset({ project_id, asset_id })
            // -- update user state with updated assets
            options.dispatch(assetUserActions.delete({ asset_id, project_id }))
            // -- push success feedback
            options.dispatch(pushFeedback({ status: true, msg: res.msg }))
            return asset_id
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


export const viewAssetsIdx = createAction<number>('invention/viewAssetsIdx')