// user reducer cases

import { WritableDraft } from "immer/dist/internal"
import { createInvention, fetchUserData, follow, inviteToProject, login, register, updateInvention, updateUser } from "./user.actions"
import { UserStateType } from "./user.types"


type WritableUserStateType = WritableDraft<UserStateType>


// fetch data cases:

export const fetchUserDataCases = {
    pending: (state: WritableUserStateType) => {
        state.isLoading = true
    },
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof fetchUserData['fulfilled']>) => {
        state.User = payload
        state.isLoading = false
        state.isAuthenticated = true
    },
    rejected: (state: WritableUserStateType) => {
        state.isLoading = false
    }
}


// follow user cases:

export const followCases = {
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof follow['fulfilled']>) => {
        // change <User.Following> array accordingly
        if (payload.action === 'add')
            state.User.Following = [...state.User.Following, payload.user]
        else state.User.Following = state.User.Following.filter(f => f._id !== payload.user._id)
    }
}


// login cases:

export const loginCases = {
    pending: (state: WritableUserStateType) => {
        state.isLoading = true
    },
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof login['fulfilled']>) => {
        state.isLoading = false
        state.User = payload
        state.isAuthenticated = true
    },
    rejected: (state: WritableUserStateType) => {
        state.isLoading = false
    }
}


// register cases:

export const registerCases = {
    pending: loginCases.pending,
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof register['fulfilled']>) => {
        state.isLoading = false
        state.User = payload
        state.isAuthenticated = true
    },
    rejected: (state: WritableUserStateType) => {
        state.isLoading = false
    }
}


// update-user cases:

export const updateUserCases = {
    pending: loginCases.pending,
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof updateUser['fulfilled']>) => {
        state.isLoading = false
        state.User = payload
    },
    rejected: (state: WritableUserStateType) => {
        state.isLoading = false
    }
}


// signout case:

export const signoutCase = (state: WritableUserStateType) => {
    state.User = null
    state.isAuthenticated = false
}


// create-invention cases:

export const createInventionCases = {
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof createInvention['fulfilled']>) => {
        state.User.Inventions.push(payload)
    }
}


// invite-to-project cases:

export const inviteToProjectCases = {
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof inviteToProject['fulfilled']>) => {

        state.User.Inventions = state.User.Inventions.map(inv => inv._id !== payload.project_id
            ? inv
            : { ...inv, Contributors: payload.updated_contributors_list }
        )
        console.log('pl: ', payload)
    }
}


// invite-to-project cases:

export const updateInventionCase = (state: WritableUserStateType, { payload }: ReturnType<typeof updateInvention>) => {
    if (payload.CreatorData._id !== state.User._id)
        // -- update shared projects
        state.User.Shared_Projects = state.User.Shared_Projects.map(sp => (sp.Project._id === payload.Project._id) ? payload : sp)
    else
        // -- update inventions
        state.User.Inventions = state.User.Inventions.map(inv => (inv._id === payload.Project._id) ? payload.Project : inv)
}


// upload-asset case:

// TODO: upload asset @ user state and finish the god-damn thing
export const uploadAssetCase = (state: WritableUserStateType, { payload }: ReturnType<typeof updateInvention>) => {
    if (payload.CreatorData._id !== state.User._id)
        // -- update shared projects
        state.User.Shared_Projects = state.User.Shared_Projects.map(sp => (sp.Project._id === payload.Project._id) ? payload : sp)
    else
        // -- update inventions
        state.User.Inventions = state.User.Inventions.map(inv => (inv._id === payload.Project._id) ? payload.Project : inv)
}