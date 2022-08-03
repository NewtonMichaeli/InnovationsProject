// actions file for user

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
// types
import { CLIENT_URIS, DEF_SEARCH_LIMIT } from '../../../configs/_client'
import { InventionActionTypes } from './invention.types'
import { RootState } from '../../store'
// actions (from other reducers)
import { updateInvention as updateUserInvention, assetActions as assetUserActions } from '../user/user.actions'
import { pushFeedback } from '../ui/ui.actions'
// utils
import * as inventionAPI from '../../../utils/api/requests/invention.api'
import { isValidString } from '../../../utils/others/validateString'


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


// change current-displaying-asset idx
export const viewAssetsIdx = createAction<number>('invention/viewAssetsIdx')


// search by query (explore)
export const searchByQuery = createAsyncThunk('invention/searchWithQuery',
    async (data: InventionActionTypes['searchWithQuery'], options) => {
        const { SearchData } = (options.getState() as RootState).invention
        // validate query
        if (!isValidString(data.query, { noSpaces: true, compare: data.loadMore ? data.query : '' }))
            return options.rejectWithValue({})
        try {
            const excludeUsers = data.loadMore ? SearchData.Data.map(d => d._id) : undefined
            const res = await inventionAPI.searchByQuery({ ...data, excludeUsers })
            // -- if <loadMore> - append new data, overwrite otherwise
            const new_data = data.loadMore ? [...SearchData.Data, ...res.data] : res.data
            return {
                data: new_data,
                query: data.query,
                eol: res.data.length < DEF_SEARCH_LIMIT && data.query.length > 0
            }
        }
        catch (err) {
            options.dispatch(pushFeedback({ status: false, msg: err.response?.data.msg ?? "Couldn't search" }))
            return options.rejectWithValue({})
        }
    })