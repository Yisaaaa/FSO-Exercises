import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const anecdote = e.target.anecdote.value;
		console.log(anecdote);
		e.target.anecdote.value = "";
		dispatch(createAnecdote(anecdote));
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="sumbit">create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
