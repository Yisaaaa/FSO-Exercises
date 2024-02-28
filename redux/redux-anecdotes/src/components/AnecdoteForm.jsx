import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
	clearNotification,
	setNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const anecdote = e.target.anecdote.value;
		console.log(anecdote);
		e.target.anecdote.value = "";

		dispatch(setNotification(`you created "${anecdote}"`));

		const response = await anecdoteService.createAnecdote(anecdote);
		dispatch(createAnecdote(response));

		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
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
