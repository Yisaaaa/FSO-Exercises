import filterReducer from "./reducers/filterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
	},
});

export default store;
