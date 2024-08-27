import express, { request, response } from "express";

const app = express(); // app - web-server
const PORT = 3000;

app.get("/", (request, response) => {
  console.log(request.url);
  console.log(request.method);

  response.send("<h1>Home page</h1>");
});

app.get("/contacts", (request, response) => {
  console.log(request.url);
  console.log(request.method);

  response.send("<h1>Contacts page</h1>");
});

app.get("/books", (request, response) => {
  console.log(request.url);
  console.log(request.method);

  response.send("<h1>Books page</h1>");
});

app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`));
