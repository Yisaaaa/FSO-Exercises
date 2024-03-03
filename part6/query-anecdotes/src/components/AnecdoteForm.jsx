import { createAnecdote } from "../anecdoteService";
import { useMutation } from "@tanstack/react-query";

const AnecdoteForm = ({ queryClient }) => {
	const createAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (anecdote) => {
			console.log("called");
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(anecdote));
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		if (content.length < 5) {
			return;
		}
		event.target.anecdote.value = "";
		console.log("new anecdote");
		createAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
