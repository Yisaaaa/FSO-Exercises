import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, updateAnecdote } from "./anecdoteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
	const queryClient = useQueryClient();

	const notificationDispatch = useNotificationDispatch();

	const setNotification = (notification) => {
		notificationDispatch({ type: "updateNotification", payload: notification });

		setTimeout(() => notificationDispatch({ type: "clearNotification" }), 3000);
	};

	const handleVote = (anecdote) => {
		console.log("vote");
		setNotification(`${anecdote.content} was voted`);
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
	};

	const updateAnecdoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(
				["anecdotes"],
				anecdotes.map((anecdote) =>
					anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
				)
			);
		},
	});

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
			<AnecdoteForm queryClient={queryClient} />

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
