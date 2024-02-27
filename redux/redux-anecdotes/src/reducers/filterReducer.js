import { createSlice } from "@reduxjs/toolkit";

// export consr filter = (filter) => {
// 	return {
// 		type: "FILTER",
// 		payload: filter,
// 	};
// };

// const filterReducer = (state = "", action) => {
// 	switch (action.type) {
// 		case "FILTER":
// 			return action.payload;

// 		default:
// 			return state;
// 	}
// };

const filterSlice = createSlice({
	name: "filter",
	initialState: "",
	reducers: {
		filter(state, action) {
			return action.payload.toLowerCase();
		},
	},
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
