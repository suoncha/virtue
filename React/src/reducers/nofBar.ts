import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface NofBarState {
  status: boolean,
  message: string,
  severity: string,
}

const initialState = {
  status: false,
  message: '',
  severity: "success",
} as NofBarState

const nofBarSlice = createSlice({
  name: 'nof',
  initialState,
  reducers: {
    errorNof: (state, action: PayloadAction<string>) => {
      state.status = true
      state.message = action.payload
      state.severity = "error"
    },
    successNof: (state, action: PayloadAction<string>) => {
      state.status = true
      state.message = action.payload
      state.severity = "success"
    },
    closeNof: (state) => {
      state.status = false
    },
  },
})

export const { errorNof, successNof, closeNof } = nofBarSlice.actions
export default nofBarSlice.reducer