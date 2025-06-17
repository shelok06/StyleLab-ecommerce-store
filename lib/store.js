import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'

export const store = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    }
  })
}