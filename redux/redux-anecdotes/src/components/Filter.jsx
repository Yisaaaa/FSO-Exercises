import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = () => {
	const dispatch = useDispatch();

	const handleChange = (event) => {
		setTimeout(() => {
			const filterWord = event.target.value;
			dispatch(filter(filterWord));
		}, 500);
	};

	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
};

export default Filter;
