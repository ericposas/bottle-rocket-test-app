import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../../api/url'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
		apiResults: []
  },
  reducers: {
    setAPIresults: (state, action) => {
      state.apiResults = action.payload
    },
  },
});

export const { setAPIresults } = mainSlice.actions

export const getFood = () => dispatch => {
	axios
	.get(url)
	.then(result => {
		let { data: { restaurants } } = result
		dispatch(setAPIresults(restaurants))
	})

  // setTimeout(() => {
  //   dispatch(incrementByAmount(amount))
  // }, 1000)
}

export const selectAPIresults = state => state.main.apiResults

export default mainSlice.reducer
