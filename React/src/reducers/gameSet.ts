import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SaveInfo {
  hpRate: number,
  death: number,
  win: number,
  plays: number
}

interface GameState {
  status: boolean,
  isGuest: boolean,
  saveNo: number,
  saveInfo: SaveInfo,
}

const initialState = {
  status: false,
  isGuest: true,
  saveNo: 0,
  saveInfo: {
    hpRate: 0,
    death: 0,
    win: 0,
    plays: 0
  }
} as GameState



const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<SaveInfo>) => {
      state.status = true
      state.saveInfo = action.payload
    },
    setSaveNo: (state, action: PayloadAction<number>) => {
      state.saveNo = action.payload
    },
    setGuest: (state) => {
      state.isGuest = false
    },
    quitGame: (state) => {
      state.status = false
    },
  },
})

export const { setGame, setGuest, setSaveNo } = gameSlice.actions
export default gameSlice.reducer