import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		updateNotification(state, action) {
			return action.payload;
		},

		clearNotification(state, action) {
			return "";
		},
	},
});

export const setNotification = (notificaiton, timeOut) => {
	return (dispatch) => {
		dispatch(updateNotification(notificaiton));

		setTimeout(() => {
			dispatch(clearNotification());
		}, timeOut * 1000);
	};
};

export const { clearNotification, updateNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;
