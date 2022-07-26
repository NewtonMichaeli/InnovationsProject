import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { inventionReducer } from './features/invention/invention.reducer'
import { userReducer } from './features/user'


export const store = configureStore({
    reducer: {
        user: userReducer,
        invention: inventionReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>