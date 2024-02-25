import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const sortByVote = (a, b) => {
		return b.votes - a.votes;
	};

	const anecdotes = useSelector((state) => state).sort(sortByVote);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch(addVote(id));
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
