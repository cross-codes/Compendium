import got, { Options } from "got";

const url = "https://api-inference.huggingface.co/models/ml6team/keyphrase-extraction-kbir-inspec";

export async function generateKeywords(text) {
  const opts = new Options({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: text,
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
