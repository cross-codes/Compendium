import express from "express";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Serving http://localhost:${port}`);
});
