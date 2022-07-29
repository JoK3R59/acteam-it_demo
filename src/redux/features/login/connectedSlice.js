import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  info: ""
}

/**
 * @link https://redux-toolkit.js.org/tutorials/quick-start
 */
export const connectedSlice = createSlice({
  name: 'connected',
  initialState,
  reducers: {
    connectedOn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
      state.info = "Vous etes bien connecté."
    },
    connectedOff: (state) => {
      state.value = false
      state.info = "Vous etes déconnecté."
    }
  },
})

// Action creators are generated for each case reducer function
export const { connectedOn, connectedOff } = connectedSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const claimConnected = (state) => state.connected.value

export default connectedSlice.reducer