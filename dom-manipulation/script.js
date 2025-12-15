let quotes = [
  { text: "h2o is 2 h and 1 o", category: "science" },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];
const quoteDisplay = document.getElementById("quoteDisplay");
const showRandomQuote = document.getElementById("newQuote");

// ADD NEW QUOTE TO QUOTES ARRAY
function createAddQuoteForm() {
  let quoteText = document.getElementById("newQuoteText");
  let quoteCategory = document.getElementById("newQuoteCategory");
  let newQuote = { text: quoteText.value, category: quoteCategory.value };

  quotes.push(newQuote);
}
//  SHOW RANDOM QUOTE
function randomQuote() {
  const number = Math.floor(Math.random() * quotes.length);
  //create element <p>
  // append child to it
  quoteDisplay.innerHTML = "";
  const paragraph = document.createElement("p");
  paragraph.textContent = `${quotes[number].text} |
   Category:${quotes[number].category}`;

  quoteDisplay.appendChild(paragraph);
}
showRandomQuote.addEventListener("click", () => randomQuote());
