import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const sortByVote = (a, b) => {
		return b.votes - a.votes;
	};

	// const anecdotes = useSelector((state) => state.anecdotes).sort(sortByVote);

	const anecdotes = useSelector(({ filter, anecdotes }) => {
		if (filter !== "") {
			return anecdotes.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(filter)
			);
		}
		return anecdotes;
	});

	const sortedAnecdotes = [...anecdotes].sort(sortByVote);

	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch(addVote(id));
	};

	return (
		<div>
			{sortedAnecdotes.map((anecdote) => (
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
