// ui reducer cases

import { WritableDraft } from "immer/dist/internal"
// types
import { UiStateType } from "./ui.types";
// actions
import { pushFeedback } from "./ui.actions";


type WritableUiStateType = WritableDraft<UiStateType>

// push feedback case

export const pushFeedbackCase = (state: WritableUiStateType, { payload }: ReturnType<typeof pushFeedback>) => {
    // push feedback & update ui-counter
    state.Notifications = [
        ...state.Notifications,
        { msg: payload.msg, status: payload.status, id: state.ui_counter, redirect: payload.redirect }
    ]
    state.ui_counter += 1
}


// pop feedback case

export const popFeedbackCase = (state: WritableUiStateType) => {
    // pop feedback
    state.Notifications.shift()
}