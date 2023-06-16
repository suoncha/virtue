import { createSlice } from '@reduxjs/toolkit'

interface WalletState {
  metamask: boolean,
  address: string,
  balance: number,
}

const initialState = {
  metamask: false,
  address: '',
  balance: 0,
} as WalletState

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectMetamask: (state) => {
      state.metamask = true
    }
  },
})

export const { connectMetamask } = walletSlice.actions
export default walletSlice.reducer