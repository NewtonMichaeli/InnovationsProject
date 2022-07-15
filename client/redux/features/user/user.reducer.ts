import { createReducer } from '@reduxjs/toolkit'
import { UserStateType } from './user.types'
import { fetchUserData } from './user.actions'


const initState: UserStateType = {
    isLoading: true,
    isAuthenticated: false,
    token: null,
    User: null
}

export const userReducer = createReducer(initState, builder => {
    builder
        // -- outcomes: fetch-user-data
        .addCase(fetchUserData.pending, state => {
            state.isLoading = true
        })
        .addCase(fetchUserData.fulfilled, (state, { payload }) => {
            state.User = payload
            state.isLoading = false
            state.isAuthenticated = true
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.isLoading = false
        })
})