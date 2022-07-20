import { createReducer } from '@reduxjs/toolkit'
import { UserStateType } from './user.types'
import { fetchUserData, follow, login, register, signout } from './user.actions'


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
                state.User.Following = [...state.User.Following, payload.user]
            else state.User.Following = state.User.Following.filter(f => f._id !== payload.user._id)
        })
        // -- outcomes: login
        .addCase(login.pending, state => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.User = payload
            state.isAuthenticated = true
        })
        .addCase(login.rejected, state => {
            state.isLoading = false
        })
        // -- outcomes: register
        .addCase(register.pending, state => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.User = payload
            state.isAuthenticated = true
        })
        .addCase(register.rejected, state => {
            state.isLoading = false
        })
        // -- outcomes: sign-out
        .addCase(signout, state => {
            state.User = null
            state.isAuthenticated = false
        })
})