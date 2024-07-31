import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        // items: []
        count:0
    },
    reducers: {
        cartPlusCount:(state,action)=>{
            state.count++;
        },
        cartMinusCount:(state,action)=>{
            state.count--;
        },
        cartCount:(state,action)=>{
            state.count = action.payload.count;
        },
    }
})

export const { cartPlusCount, cartMinusCount, cartCount } = cartSlice.actions;

export default cartSlice.reducer;