import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: []
    },
    reducers: {
        cartFiller: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        localCart: (state) => {
            localStorage.setItem("cart", JSON.stringify(state.value))
        },
        deleteCart: (state, action) => {
        let filter = action.payload
        let newCart = state.value.filter((element)=>{return (element.product !== filter.product)})
        state.value = newCart
        }
    }
})

// Action creators are generated for each case reducer function
export const { cartFiller, localCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer