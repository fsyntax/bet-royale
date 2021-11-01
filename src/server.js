const { port } = require("./config.json");
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.sendFile("public/index.html", { root: "." });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
