import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        jwt: localStorage.getItem("jwt"),
        name: localStorage.getItem("name"),
    },
    reducers: {
        setAuthDetails: (state, action) => {
            state.jwt = action.payload.jwt;
            state.name = action.payload.name;
        },
    }
})

export const { setAuthDetails } = authSlice.actions;

export default authSlice.reducer;