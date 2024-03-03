import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes/";

export const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};
