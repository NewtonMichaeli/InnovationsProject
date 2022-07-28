// actions file for ui
import { createAction } from '@reduxjs/toolkit'
import { UiStateType } from './ui.types'


// export type pushFeedback__type = { status: boolean, msg: string }
export type pushFeedback__type = Omit<UiStateType['Notifications'][number], 'id'>
// action: push feedback
export const pushFeedback = createAction<pushFeedback__type>('ui/pushFeedback')

// action: pop feedback
export const popFeedback = createAction('ui/popFeedback')