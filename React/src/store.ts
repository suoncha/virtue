import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers/gameSet'
import pageReducer from './reducers/pageSwitch'
import nofReducer from './reducers/nofBar'
import fieldReducer from './reducers/fieldSwitch'
import barReducer from './reducers/barSet'
import walletReducer from './reducers/walletSet'

export const store = configureStore({
    reducer: {
        page: pageReducer,
        game: gameReducer,
        nof: nofReducer,
        field: fieldReducer,
        bar: barReducer,
        wallet: walletReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch