import { createSlice } from '@reduxjs/toolkit'

interface BarState {
  feedback: boolean,
  about: boolean,
  changelog: boolean,
  lastVersion: boolean,
  cryptoShop: boolean,
  metamask: boolean,
}

const initialState = {
  feedback: false,
  about: false,
  changelog: false,
  lastVersion: false,
  cryptoShop: false,
  metamask: false,
} as BarState

const barSlice = createSlice({
  name: 'bar',
  initialState,
  reducers: {
    openFeedback: (state) => {
      state.feedback = true
    },
    closeFeedback: (state) => {
      state.feedback = false
    },
    openAbout: (state) => {
      state.about = true
      },
    closeAbout: (state) => {
      state.about = false
    },
    openChangelog: (state) => {
      state.changelog = true
    },
    closeChangelog: (state) => {
      state.changelog = false
    },
    openLastVersion: (state) => {
      state.lastVersion = true
    },
    closeLastVersion: (state) => {
      state.lastVersion = false
    },
    openCryptoShop: (state) => {
      state.cryptoShop = true
    },
    closeCryptoShop: (state) => {
      state.cryptoShop = false
    }
  },
})

export const { openFeedback, closeFeedback, openAbout, closeAbout, 
  openChangelog, closeChangelog, openLastVersion, closeLastVersion,
  openCryptoShop, closeCryptoShop } = barSlice.actions
export default barSlice.reducer