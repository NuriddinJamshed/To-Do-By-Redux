import { configureStore } from '@reduxjs/toolkit'
import tableUsers from '../reducers/tableUsers'

export const store = configureStore({
  reducer: {
    DataUsers : tableUsers
  }
})