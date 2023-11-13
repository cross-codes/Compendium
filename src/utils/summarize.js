import got, { Options } from "got";

const url = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

export async function summarizeText(text) {
  const opts = new Options({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: text,
      parameters: {
        max_length: 100,
        min_length: 30,
      },
    }),
    throwHttpErrors: false,
  });
  try {
    const response = await got(url, undefined, opts).json();
    return response;
  } catch (e) {
    console.log(e);
  }
}
