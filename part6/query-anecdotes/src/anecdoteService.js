import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes/";

export const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

export const createAnecdote = async (anecdote) => {
	const res = await axios.post(baseUrl, anecdote);
	return res.data;
};

export const updateAnecdote = async (anecdote) => {
	const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
	return res.data;
};
