let quotes = [
  { text: "h2o is 2 h and 1 o", category: "science" },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];
const quoteDisplay = document.getElementById("quoteDisplay");
const showRandomQuote = document.getElementById("newQuote");
showRandomQuote.addEventListener("click", () => "");
// ADD NEW QUOTE TO QUOTES ARRAY
function addQuote() {
  let quoteText = document.getElementById("newQuoteText");
  let quoteCategory = document.getElementById("newQuoteCategory");
  let newQuote = { text: quoteText.value, category: quoteCategory.value };

  quotes.push(newQuote);
}
//  SHOW RANDOM QUOTE
function randomQuote() {
  const number = Math.floor(Math.random() * quotes.length);
  quoteDisplay.innerHTML = `<p>${quotes[number].text}</p>
  <p>Category:${quotes[number].category}</p>`;
}
showRandomQuote.addEventListener("click", () => randomQuote());
