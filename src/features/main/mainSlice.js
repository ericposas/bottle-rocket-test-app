import { createSlice } from '@reduxjs/toolkit'
import { LIST_VIEW } from '../constants/constants'
import axios from 'axios'
import { url } from '../../api/url'
import { restaurantNameToURLPath } from '../utils/Utils'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
		apiResults: [],
		apiResultsAsObject: null,
		view: LIST_VIEW,
		layout: null,
		lastRestaurantViewed: null,
		currentlySelectedRestaurant: null,
  },
  reducers: {
    setAPIresults: (state, action) => { state.apiResults = action.payload },
		setAPIresultsAsObject: (state, action) => { state.apiResultsAsObject = action.payload },
		setViewType: (state, action) => { state.view = action.payload },
		setLayout: (state, action) => { state.layout = action.payload },
		setCurrentlySelectedRestaurant: (state, action) => { state.currentlySelectedRestaurant = action.payload },
		setLastRestaurantViewed: (state, action) => { state.lastRestaurantViewed = action.payload },
  },
});

export const { setAPIresults, setAPIresultsAsObject, setViewType, setLayout, setCurrentlySelectedRestaurant, setLastRestaurantViewed } = mainSlice.actions

export const getFood = () => dispatch => {
	axios
	.get(url)
	.then(result => {
		let _result = Object.assign({}, result)
		let { data: { restaurants } } = _result
		let apiAsObj = {}
		restaurants.forEach(restaurant => {
			let pathname = restaurantNameToURLPath(restaurant)
			apiAsObj[pathname] = restaurant
		})
		dispatch(setAPIresultsAsObject(apiAsObj))
		dispatch(setAPIresults(restaurants))
	})
}

export default mainSlice.reducer
