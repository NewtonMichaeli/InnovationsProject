import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// reducers
import { inventionReducer } from './features/invention'
import { uiReducer } from './features/ui'
import { userReducer } from './features/user'


export const store = configureStore({
    reducer: {
        user: userReducer,
        invention: inventionReducer,
        ui: uiReducer,
    }
})


export type AppDispatch = typeof store.dispatch
export type GetState = typeof store.getState
export type RootState = ReturnType<GetState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>