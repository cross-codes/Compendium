import got, { Options } from "got";

const url = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export async function generateImage(text) {
  const words = text.split(/\s+/);
  const truncatedText = words.slice(0, 20).join(" ");
  const opts = new Options({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: truncatedText,
    }),
    responseType: "buffer",
    throwHttpErrors: false,
  });

  try {
    const response = await got(url, undefined, opts);
    return response.body;
  } catch (e) {
    console.log(e);
  }
}
