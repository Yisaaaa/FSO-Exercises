import { useReducer } from "react";
import NotificationContext, {
	notificationReducer,
} from "../NotificationContext";

const NotificationContextProvider = (props) => {
	const [notification, dispatch] = useReducer(notificationReducer, "");

	const setNotification = (notification) => {
		dispatch({ type: "updateNotification", payload: notification });

		setTimeout(() => dispatch({ type: "clearNotification" }), 3000);
	};

	return (
		<NotificationContext.Provider value={[notification, setNotification]}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContextProvider;
