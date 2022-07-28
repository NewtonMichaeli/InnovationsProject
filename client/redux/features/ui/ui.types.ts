// types for ui reducer


// ui state type
export type UiStateType = {
    Notifications: {
        status: boolean,
        msg: string,
        id: number,
        redirect?: {
            uri: string,
            shallow?: boolean
        }
    }[],
    ui_counter: number
}