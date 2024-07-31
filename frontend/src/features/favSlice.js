import { createSlice } from "@reduxjs/toolkit";

export const favtSlice = createSlice({
    name: "fav",
    initialState: {
        count:0
    },
    reducers: {
        favPlusCount:(state,action)=>{
            state.count++;
        },
        favMinusCount:(state,action)=>{
            state.count--;
        },
        favCount:(state,action)=>{
            state.count = action.payload.count;
        },
    }
})

export const { favCount, favMinusCount, favPlusCount } = favtSlice.actions;

export default favtSlice.reducer;