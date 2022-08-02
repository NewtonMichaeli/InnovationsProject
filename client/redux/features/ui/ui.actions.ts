// actions file for ui

import { createAction } from '@reduxjs/toolkit'
// types
import { UiStateType } from './ui.types'


// action: push feedback
export const pushFeedback = createAction<
    Omit<UiStateType['Notifications'][number], 'id'>
>('ui/pushFeedback')


// action: pop feedback
export const popFeedback = createAction('ui/popFeedback')