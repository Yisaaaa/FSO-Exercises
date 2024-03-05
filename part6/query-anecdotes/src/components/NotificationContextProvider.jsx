import { useReducer } from "react";
import NotificationContext, {
	notificationReducer,
} from "../NotificationContext";

const NotificationContextProvider = (props) => {
	const [notification, dispatch] = useReducer(notificationReducer, "");

	return (
		<NotificationContext.Provider value={[notification, dispatch]}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContextProvider;
