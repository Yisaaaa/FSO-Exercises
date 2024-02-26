import { useDispatch } from "react-redux";
import { filter } from "../reducers/anecdoteReducer";

const Filter = () => {
	const dispatch = useDispatch();

	const handleChange = (event) => {
		const filterWord = event.target.value;
		dispatch(filter(filterWord));
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
