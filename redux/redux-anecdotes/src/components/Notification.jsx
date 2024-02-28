import { useSelector } from "react-redux/es/hooks/useSelector";

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
	};

	console.log(notification);
	if (notification === "") {
		return;
	}

	return <div style={style}>{notification}</div>;
};

export default Notification;
