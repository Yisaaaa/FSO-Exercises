import axios from "axios";

const baseURL = "http://localhost:3001/persons";

function create(newObj) {
	return axios.post(baseURL, newObj).then((res) => res.data);
}

function getAll() {
	return axios.get(baseURL).then((res) => {
		return res.data;
	});
}

function remove(id) {
	const request = axios.delete(`${baseURL}/${id}`);
	return request.then((res) => res.data);
}

export default {
	create,
	getAll,
	remove,
};
