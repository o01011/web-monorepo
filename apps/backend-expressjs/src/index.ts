import express from "express";

const app = express();
const port = 3000;

app.get("/", (_request, response) => {
	response.send("I am here.");
});

app.listen(port);
