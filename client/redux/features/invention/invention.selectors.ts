import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "../../store"


// -- export inventionselector
export const inventionSelector = createSelector(
    (state: RootState) => state.invention,
    state => state
)