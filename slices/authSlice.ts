import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
	isLoggedIn: boolean;
}

const initialState: AuthState = {
	isLoggedIn: false,
};

export const authSlice = createSlice({
	name: "authenticator",
	initialState: initialState,
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.isLoggedIn = false;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
