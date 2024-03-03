import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, createAnecdote } from "./anecdoteService";
import { useQuery } from "@tanstack/react-query";

const App = () => {
	const handleVote = (anecdote) => {
		console.log("vote");
	};

	// const anecdotes = [
	// 	{
	// 		content: "If it hurts, do it more often",
	// 		id: "47145",
	// 		votes: 0,
	// 	},
	// ];

	const anecdotesQuery = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAll,
		refetchOnWindowFocus: false,
		retry: 1,
	});

	console.log(JSON.parse(JSON.stringify(anecdotesQuery)));

	if (anecdotesQuery.isPending) {
		return <div>Waiting for the anecdotes to be retrieved...</div>;
	} else if (anecdotesQuery.isError) {
		return <div>anecdote service not available due to problems in server</div>;
	}

	const anecdotes = anecdotesQuery.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
