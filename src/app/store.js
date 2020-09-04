import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../features/main/mainSlice'

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
})

// store.subscribe(() => {
// 	console.log(
// 		store.getState()
// 	)
// })

export default store
