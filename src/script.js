const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twettBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


// Loader
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Finsh loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}

async function getQuote() {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    loading();
    const response = await fetch(proxy + apiUrl);
    const data = await response.json();
    // If author is blank add "Unknown"
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown"
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // If text long reduce font size
    if (data.quoteText.length > 50) {
      quoteText.classList.add("long-quote")
    } else {
      quoteText.classList.remove("long-quote")
    }

    quoteText.innerText = data.quoteText;
    complete();
  } catch (err) {
    console.log(err);
  }
}


function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
  window.open(tweetUrl, '_blank')
}

// Event Listeners

newQuoteBtn.addEventListener("click", getQuote);
twettBtn.addEventListener("click", tweetQuote);

getQuote();