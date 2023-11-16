const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const keywordArea = document.getElementById("keyword");

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
    const { summarizedText, keywordString } = await response.json();
    summarizedTextArea.value = summarizedText[0].summary_text;
    keywordArea.value = keywordString;
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    submitButton.classList.remove("submit-button--loading");
  }
}

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
