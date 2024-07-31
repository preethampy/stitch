import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import cartSlice from "../features/cartSlice";
import favSlice from "../features/favSlice";

export default configureStore({ reducer: { auth: authSlice, cart: cartSlice, fav:favSlice } });