// const http = require("http");

const express = require("express");

const app = express();
app.use(express.json());

// const app = http.createServer((request, response) => {
// 	response.writeHead(200, { "Content-type": "text/plain" });
// 	response.end("Hello World");

let notes = [
	{ id: 1, content: "HTML is easy", important: true },
	{
		id: 2,
		content: "Browser can execute only JavaScript",
		important: false,
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true,
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
	console.log(request.headers);
	response.send(notes);
});

app.get("/api/notes/:id", (request, response) => {
	const id = request.params.id;
	const note = notes.find((note) => note.id.toString() === id);

	if (note) {
		response.json(note);
	} else {
		response.status(404);
		response.end();
	}
});

app.post("/api/notes/", (req, res) => {
	console.log(req.headers);
	console.log(req.get("Content-Type"));
	res.json(req.body);
});

app.delete("/api/notes/:id", (req, res) => {
	const id = req.params.id;

	notes = notes.filter((note) => note.id.toString() !== id);
	res.status(204).end();
});

app.get("/api", (req, resp) => {
	resp.send("<p>To start using the api, send a request to ./notes</p>");
});

// 	response.writeHead(200, { "Content-Type": "application/json" });
// 	response.end(JSON.stringify(notes));
// });

const PORT = 3001;

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
console.log("\n\nYou can click the link below");
console.log(`http://localhost:${PORT}`);
