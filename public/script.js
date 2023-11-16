const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const imageArea = document.getElementById("summary-image");

submitButton.disabled = true;

function verifyTextLength(e) {
  const text = e.target;

  if (text.value.length > 200 && text.value.length < 10000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

async function submitData(_) {
  submitButton.classList.add("submit-button--loading");
  const textToSummarize = textArea.value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    text_to_summarize: textToSummarize,
  });

  const opts = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("/summarize", opts);
    const { summarizedText, imageBuffer } = await response.json();

    const imageArray = new Uint8Array(imageBuffer.data);
    const imageBlob = new Blob([imageArray], { type: "image/jpeg" });

    summarizedTextArea.value = summarizedText;
    imageArea.src = URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    submitButton.classList.remove("submit-button--loading");
  }
}

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
