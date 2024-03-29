import { createReducer } from '@reduxjs/toolkit'
// types
import { UserStateType } from './user.types'
// actions
import { fetchUserData, follow, login, register, signout, updateUser, createInvention, inviteToProject, updateInvention, assetActions } from './user.actions'
// action cases
import { assetActionCases, createInventionCases, fetchUserDataCases, followCases, inviteToProjectCases, loginCases, registerCases, signoutCase, updateInventionCase, updateUserCases } from './user.reducer-cases'


const initState: UserStateType = {
    isLoading: true,
    isAuthenticated: false,
    User: null
}

export const userReducer = createReducer(initState, builder => {
    // TODO: rejection-handler for every action -> pushing error messages to a custom notifications-reducer
    builder
        // -- outcomes: fetch-user-data
        .addCase(fetchUserData.pending, fetchUserDataCases.pending)
        .addCase(fetchUserData.fulfilled, fetchUserDataCases.fulfilled)
        .addCase(fetchUserData.rejected, fetchUserDataCases.rejected)
        // -- outcomes: login
        .addCase(login.pending, loginCases.pending)
        .addCase(login.fulfilled, loginCases.fulfilled)
        .addCase(login.rejected, loginCases.rejected)
        // -- outcomes: register
        .addCase(register.pending, registerCases.pending)
        .addCase(register.fulfilled, registerCases.fulfilled)
        .addCase(register.rejected, registerCases.rejected)
        // -- outcomes: update-user
        .addCase(updateUser.pending, updateUserCases.pending)
        .addCase(updateUser.fulfilled, updateUserCases.fulfilled)
        .addCase(updateUser.rejected, updateUserCases.rejected)
        // -- outcomes: follow-user
        .addCase(follow.fulfilled, followCases.fulfilled)
        // -- outcomes: sign-out
        .addCase(signout, signoutCase)
        // -- outcomes: create-invention
        .addCase(createInvention.fulfilled, createInventionCases.fulfilled)
        // -- outcomes: invite-to-project
        .addCase(inviteToProject.fulfilled, inviteToProjectCases.fulfilled)
        // -- outcomes: update-invention
        .addCase(updateInvention, updateInventionCase)
        // -- outcomes: asset-actions (upload, delete)
        .addCase(assetActions.upload, assetActionCases.upload)
        .addCase(assetActions.delete, assetActionCases.delete)
})