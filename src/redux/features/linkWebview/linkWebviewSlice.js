import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "https://www.acteam-it.com/"
}

/**
 * @link https://redux-toolkit.js.org/tutorials/quick-start
 */
export const linkWebviewSlice = createSlice({
  name: 'linkWebview',
  initialState,
  reducers: {
    sendLink: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { sendLink } = linkWebviewSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getterLinkUrl = (state) => state.linkWebview.value

export default linkWebviewSlice.reducer
