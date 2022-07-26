import { createReducer } from '@reduxjs/toolkit'
import { storeInvention } from './invention.actions'
import { storeInventionCase } from './invention.reducer-cases'
import { InventionStateType } from './invention.types'


const initState: InventionStateType = {
    Invention: null,
    InventionUserRole: null
}

export const inventionReducer = createReducer(initState, builder => {
    // TODO: rejection-handler for every action -> pushing error messages to a custom notifications-reducer
    builder
        .addCase(storeInvention, storeInventionCase)
})