import { createSelector } from '@reduxjs/toolkit'
import { RootState } from "../../store"


// -- export user selector
export const userSelector = createSelector(
    (state: RootState) => state.user, 
    state => state
)