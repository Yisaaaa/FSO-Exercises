import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

export const getNotes = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

export const createNote = async (newNote) => {
	const res = await axios.post(baseUrl, newNote);
	return res.data;
};

export const updateNote = async (updatedNote) => {
	const res = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote);
	return res.data;
};
