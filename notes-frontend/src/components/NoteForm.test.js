import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteForm from "./NoteForm";

describe("<NoteForm />", () => {
	test("<NoteForm /> updates parent state and calls onSubmit", async () => {
		const createNote = jest.fn();
		const user = userEvent.setup();

		const { container } = render(<NoteForm createNote={createNote} />);

		const input = screen.getByPlaceholderText("write note here");
		const sendButton = screen.getByText("save");
		// const input = container.querySelector("#note-input");

		await user.type(input, "testing a form");
		await user.click(sendButton);

		console.log(createNote.mock.calls);

		expect(createNote.mock.calls).toHaveLength(1);
		expect(createNote.mock.calls[0][0].content).toBe("testing a form");
	});
});
