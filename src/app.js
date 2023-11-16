import dotenv from "dotenv";
import express from "express";
import path from "path";
import { generateImage } from "./utils/images.js";
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
    const summarizedTextResponse = await summarizeText(text);
    const summarizedText = summarizedTextResponse[0].summary_text;

    const imageBuffer = await generateImage(summarizedText);
    res.send({ summarizedText, imageBuffer });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Serving http://localhost:${port}`);
});
