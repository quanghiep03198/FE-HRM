import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { authApi } from "./apis/@auth";

const rootReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
	[authApi.reducerPath]: authApi.reducer
});

export default rootReducer;
