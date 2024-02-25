import { useSelector, useDispatch } from "react-redux";
import { addVote, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch(addVote(id));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const anecdote = e.target.anecdote.value;
		console.log(anecdote);
		e.target.anecdote.value = "";
		dispatch(createAnecdote(anecdote));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="sumbit">create</button>
			</form>
		</div>
	);
};

export default App;
