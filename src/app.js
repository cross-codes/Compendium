import dotenv from "dotenv";
import express from "express";
import path from "path";
import { generateKeywords } from "./utils/keywords.js";
import { summarizeText } from "./utils/summarize.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const publicPath = path.join(new URL("../public", import.meta.url).pathname);
app.use(express.static(publicPath));

app.post("/summarize", async (req, res) => {
  try {
    const text = req.body.text_to_summarize;
    const summarizedText = await summarizeText(text);
    const responseArray = await generateKeywords(text);
    const uniqueWordsSet = new Set(responseArray.map(item => item.word.trim().toLowerCase()));
    const keywordString = Array.from(uniqueWordsSet).join(", ");
    res.send({ summarizedText, keywordString });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Serving http://localhost:${port}`);
});
