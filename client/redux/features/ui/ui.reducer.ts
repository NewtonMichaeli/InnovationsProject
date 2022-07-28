import { createReducer } from '@reduxjs/toolkit'
import { popFeedback, pushFeedback } from './ui.actions'
import { popFeedbackCase, pushFeedbackCase } from './ui.reducer-cases'
import { UiStateType } from './ui.types'


const initState: UiStateType = {
    Notifications: [],
    ui_counter: 0
}

export const uiReducer = createReducer(initState, builder => {
    builder
        .addCase(pushFeedback, pushFeedbackCase)
        .addCase(popFeedback, popFeedbackCase)
})