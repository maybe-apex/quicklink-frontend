import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/models/user";

export interface AppDataState {
	user?: User;
}

const initialState: AppDataState = {
	user: undefined,
};

export const appDataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setUser: (
			state = initialState,
			action: PayloadAction<User | undefined>
		) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = appDataSlice.actions;
export default appDataSlice.reducer;
