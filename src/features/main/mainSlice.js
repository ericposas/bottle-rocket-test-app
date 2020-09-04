import { createSlice } from '@reduxjs/toolkit'
import { LIST_VIEW, DETAIL_VIEW } from '../constants/constants'
import axios from 'axios'
import { url } from '../../api/url'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
		apiResults: [],
		view: LIST_VIEW,
		layout: null,
		currentlySelectedRestaurant: null
  },
  reducers: {
    setAPIresults: (state, action) => { state.apiResults = action.payload },
		setViewType: (state, action) => { state.view = action.payload },
		setLayout: (state, action) => { state.layout = action.payload },
		setCurrentlySelectedRestaurant: (state, action) => { state.currentlySelectedRestaurant = action.payload }
  },
});

export const { setAPIresults, setViewType, setLayout, setCurrentlySelectedRestaurant } = mainSlice.actions

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
