import got, { Options } from "got";

const url =
  "hServers play a vital role in modern digital infrastructure. They are specialized computers designed to store, manage, and process data, applications, and services. Acting as central repositories, servers respond to requests from client devices.ttps://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export async function generateImage(text) {
  const opts = new Options({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      inputs: text,
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
