import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PageState {
  page: number
}

const initialState = {
  page: 0,
} as PageState

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    switchPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { switchPage } = pageSlice.actions
export default pageSlice.reducer
// 0 - Login
// 1, 2, 3 - Forgot password
// 4, 5 - Register
// 6 - Save Files 