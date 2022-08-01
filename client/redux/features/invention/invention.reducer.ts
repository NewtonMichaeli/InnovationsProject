import { createReducer } from '@reduxjs/toolkit'
import { storeInvention, updateInvention } from './invention.actions'
import { storeInventionCase, updateInventionCases } from './invention.reducer-cases'
import { InventionStateType } from './invention.types'


const initState: InventionStateType = {
    Invention: null,
    InventionUserRole: null
}

export const inventionReducer = createReducer(initState, builder => {
    builder
        // outcomes: store-invention
        .addCase(storeInvention, storeInventionCase)
        // outcomes: update-invention-data
        .addCase(updateInvention['fulfilled'], updateInventionCases.fulfilled)
})