import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Note from "./Note";
import userEvent from "@testing-library/user-event";

test("renders note", async () => {
	const note = {
		content: "Component testing is done with react-testing-library",
		important: true,
	};

	const mockHandler = jest.fn();

	const { container } = render(
		<Note note={note} toggleImportance={mockHandler} />
	);

	const user = userEvent.setup();
	const button = screen.getByText("make not important");
	await user.click(button);

	expect(mockHandler.mock.calls).toHaveLength(1);
	// const element = screen.getByText(
	// 	"Component testing is done with react-testing-library"
	// );

	// const element = screen.getByTestId("note");
	// expect(element).toHaveTextContent(
	// 	"Component testing is done with react-testing-library"
	// );

	// screen.debug();
});
