import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../redux/reducers'

export default configureStore({
  reducer: rootReducer,
})