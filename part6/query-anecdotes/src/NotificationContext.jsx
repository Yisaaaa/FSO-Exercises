import { createContext, useContext, useReducer } from "react";

export const notificationReducer = (state, action) => {
	switch (action.type) {
		case "updateNotification":
			return action.payload;

		case "clearNotification":
			return "";
	}
};

const notificationContext = createContext();

export const useNotificationValue = () => {
	return useContext(notificationContext)[0];
};

export const useSetNotification = () => {
	return useContext(notificationContext)[1];
};

export default notificationContext;
