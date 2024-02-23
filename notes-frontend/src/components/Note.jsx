const Note = ({ note, toggleImportance }) => {
	const label = note.important ? "make not important" : "make important";

	return (
		<li data-testid="note" className="note">
			{note.content}
			<button onClick={toggleImportance}>{label}</button>
		</li>
	);
};

export default Note;
