import { useSelector, useDispatch } from "react-redux";
import { addVote, setAnecdotes } from "../reducers/anecdoteReducer";
import {
	clearNotification,
	setNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";
import { useEffect } from "react";

const AnecdoteList = () => {
	useEffect(() => {
		anecdoteService
			.getAll()
			.then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
	}, []);

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

	const vote = (anecdote) => {
		dispatch(setNotification(`you voted "${anecdote.content}"`));

		console.log("vote", anecdote.id);
		dispatch(addVote(anecdote.id));

		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
	};

	return (
		<div>
			{sortedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
