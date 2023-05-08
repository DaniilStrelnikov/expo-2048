import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./GameSlice";

export const store = configureStore({
	reducer: {
		GameReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
