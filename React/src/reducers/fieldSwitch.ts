import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FieldState {
  email: string,
  saveNo: number,
  username: string,
  password: string,
}

const initialState = {
  email: '',
  saveNo: 0,
  username: '',
  password: '',
} as FieldState

const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    changeSaveNo: (state, action: PayloadAction<number>) => {
      state.saveNo = action.payload
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    changeUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
  },
  },
})

export const { changeSaveNo, changeEmail, changeUsername, changePassword } = fieldSlice.actions
export default fieldSlice.reducer