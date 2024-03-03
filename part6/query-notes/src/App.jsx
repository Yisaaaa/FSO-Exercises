import {
	QueryErrorResetBoundary,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getNotes, createNote, updateNote } from "./request";

const App = () => {
	const addNote = async (event) => {
		event.preventDefault();
		const content = event.target.note.value;
		if (content === "") {
			return;
		}
		event.target.note.value = "";

		// call the mutation here
		newNoteMutation.mutate({ content, important: false });
	};

	const toggleImportance = (note) => {
		console.log("toggle importance of", note.id);
		const updatedNote = { ...note, important: !note.important };
		updateNoteMutation.mutate(updatedNote);
	};

	const queryClient = useQueryClient();

	const invalidateNotesQueries = () => {
		queryClient.invalidateQueries({ queryKey: ["notes"] });
	};

	const appendNotesQuery = (newNote) => {
		const notes = queryClient.getQueryData(["notes"]);
		queryClient.setQueryData(["notes"], notes.concat(newNote));
	};

	const updateNotesQuery = (updatedNote) => {
		const notes = queryClient.getQueryData(["notes"]);
		queryClient.setQueryData(
			["notes"],
			notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
		);
	};

	// const notes = [];
	const newNoteMutation = useMutation({
		mutationFn: createNote,
		// onSuccess: invalidateNotesQueries,
		// Above would send get request every mutation
		onSuccess: appendNotesQuery,
	});

	const updateNoteMutation = useMutation({
		mutationFn: updateNote,
		onSuccess: updateNotesQuery,
	});

	const result = useQuery({
		queryKey: ["notes"],
		queryFn: getNotes,
		refetchOnWindowFocus: false,
	});

	console.log(JSON.parse(JSON.stringify(result)));

	if (result.isLoading) {
		return <div>data is loading...</div>;
	}

	const notes = result.data;

	return (
		<div>
			<h2>Notes app</h2>
			<form onSubmit={addNote}>
				<input name="note" />
				<button type="submit">add</button>
			</form>
			{notes.map((note) => (
				<li key={note.id} onClick={() => toggleImportance(note)}>
					{note.content}
					<strong> {note.important ? "important" : ""}</strong>
				</li>
			))}
		</div>
	);
};

export default App;
