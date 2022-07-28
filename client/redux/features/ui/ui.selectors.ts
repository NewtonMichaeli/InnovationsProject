import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "../../store"


// -- export ui selector
export const uiSelector = createSelector(
    (state: RootState) => state.ui,
    state => state
)