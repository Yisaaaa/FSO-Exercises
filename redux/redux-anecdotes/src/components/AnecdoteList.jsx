import { useSelector, useDispatch } from "react-redux";
import {
	incrementVote,
	initializeAnecdotes,
} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const AnecdoteList = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeAnecdotes());
	}, []);
	// useEffect(() => {
	// 	anecdoteService
	// 		.getAll()
	// 		.then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
	// }, []);

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

	const vote = (anecdote) => {
		// dispatch(setNotification(`you voted "${anecdote.content}"`));
		// setTimeout(() => {
		// 	dispatch(clearNotification());
		// }, 5000);

		// Using redux thunk
		dispatch(setNotification(`you voted ${anecdote.content}`), 5);

		dispatch(incrementVote(anecdote));
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
