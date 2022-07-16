import { createReducer } from '@reduxjs/toolkit'
import { UserStateType } from './user.types'
import { fetchUserData, follow } from './user.actions'


const initState: UserStateType = {
    isLoading: true,
    isAuthenticated: false,
    token: null,
    User: null
}

export const userReducer = createReducer(initState, builder => {
    // TODO: rejection-handler for every action -> pushing error messages to a custom notifications-reducer
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
        .addCase(fetchUserData.rejected, (state) => {
            state.isLoading = false
        })
        // -- outcomes: follow-user
        .addCase(follow.fulfilled, (state, { payload }) => {
            // change <User.Following> array accordingly
            if (payload.action === 'add')
                state.User.Following = [...state.User.Following, payload.target_user]
            else state.User.Following = state.User.Following.filter(f => f !== payload.target_user)
        })
})