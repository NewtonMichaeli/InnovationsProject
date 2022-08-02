import { createReducer } from '@reduxjs/toolkit'
import { deleteAsset, storeInvention, updateInvention, uploadAsset, viewAssetsIdx } from './invention.actions'
import { assetActionCases, storeInventionCase, updateInventionCases, viewAssetsIdxCase } from './invention.reducer-cases'
import { InventionStateType } from './invention.types'


const initState: InventionStateType = {
    Invention: null,
    InventionUserRole: null,
    ViewAssetsIdx: null
}

export const inventionReducer = createReducer(initState, builder => {
    builder
        // outcomes: store-invention
        .addCase(storeInvention, storeInventionCase)
        // outcomes: update-invention-data
        .addCase(updateInvention.fulfilled, updateInventionCases.fulfilled)
        // outcomes: asset-actions
        .addCase(uploadAsset.fulfilled, assetActionCases.upload.fulfilled)
        .addCase(deleteAsset.fulfilled, assetActionCases.delete.fulfilled)
        // outcomes: change-view-assets-idx
        .addCase(viewAssetsIdx, viewAssetsIdxCase)
})