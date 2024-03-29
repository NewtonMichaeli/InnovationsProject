// user reducer cases

import { WritableDraft } from "immer/dist/internal"
// types
import { UserStateType } from "./user.types"
// actions
import { assetActions, createInvention, fetchUserData, follow, inviteToProject, login, register, updateInvention, updateUser } from "./user.actions"


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


// asset-action cases:

export const assetActionCases = {
    upload: (state: WritableUserStateType, { payload }: ReturnType<typeof assetActions['upload']>) => {
        if (state.User.Inventions.some(inv => inv._id === payload.project_id)) {
            // -- update invention assets
            state.User.Inventions = state.User.Inventions.map(inv => (inv._id === payload.project_id)
                ? { ...inv, Assets: payload.data } : inv)
        }
        else {
            // -- update shared-project assets
            state.User.Shared_Projects = state.User.Shared_Projects.map(sp => (sp.Project._id === payload.project_id)
                ? { ...sp, Project: { ...sp.Project, Assets: payload.data } } : sp)
        }
    },
    delete: (state: WritableUserStateType, { payload }: ReturnType<typeof assetActions['delete']>) => {
        if (state.User.Inventions.some(inv => inv._id === payload.project_id)) {
            // -- update invention assets
            state.User.Inventions = state.User.Inventions.map(inv => (inv._id === payload.project_id)
                ? { ...inv, Assets: inv.Assets.filter(a => a._id !== payload.asset_id) } : inv)
        }
        else {
            // -- update shared-project assets
            state.User.Shared_Projects = state.User.Shared_Projects.map(sp => (sp.Project._id === payload.project_id)
                ? { ...sp, Project: { ...sp.Project, Assets: sp.Project.Assets.filter(a => a._id !== payload.asset_id) } } : sp)
        }
    }
}