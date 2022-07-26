// user reducer cases

import { WritableDraft } from "immer/dist/internal"
import { createInvention, fetchUserData, follow, login, register, updateUser } from "./user.actions"
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


// signout cases:

export const signoutCases = {
    success: (state: WritableUserStateType) => {
        state.User = null
        state.isAuthenticated = false
    }
}


// create-invention cases:

export const createInventionCases = {
    fulfilled: (state: WritableUserStateType, { payload }: ReturnType<typeof createInvention['fulfilled']>) => {
        state.User.Inventions.push(payload)
    }
}
