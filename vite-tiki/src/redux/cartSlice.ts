import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartState, CartItem } from './types'

const initialState: CartState = {
  items: [] as CartItem[],
  totalQuantity: 0
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity
      } else {
        state.items.push(newItem)
      }
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
    },
    updateQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
      }
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
    }
  }
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
