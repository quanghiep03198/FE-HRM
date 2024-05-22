import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/@auth";

const initialState = {
	user: null,
	accessToken: null,
	authenticated: false
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: () => {
			return initialState;
		}
	},
	extraReducers(builder) {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(_, action) => {
				console.log("action.payload", action.payload);
				return { ...action.payload, authenticated: true };
			}
		);
	}
});

export const { logout } = authSlice.actions;
