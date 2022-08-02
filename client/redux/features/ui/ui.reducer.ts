import { createReducer } from '@reduxjs/toolkit'
// types
import { UiStateType } from './ui.types'
// actions
import { popFeedback, pushFeedback } from './ui.actions'
// action cases
import { popFeedbackCase, pushFeedbackCase } from './ui.reducer-cases'


const initState: UiStateType = {
    Notifications: [],
    ui_counter: 0
}

export const uiReducer = createReducer(initState, builder => {
    builder
        .addCase(pushFeedback, pushFeedbackCase)
        .addCase(popFeedback, popFeedbackCase)
})