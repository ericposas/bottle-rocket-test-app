import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../features/main/mainSlice'

export default configureStore({
  reducer: {
    main: mainReducer,
  },
})
