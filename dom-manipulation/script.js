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
  localStorage.setItem("quotes", JSON.stringify(quotes));
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
  console.log(paragraph);
}
showRandomQuote.addEventListener("click", () => randomQuote());
window.addEventListener("DOMContentLoaded", () => randomQuote());
window.addEventListener(
  "DOMContentLoaded",
  () => (quotes = [...JSON.parse(localStorage.getItem("quotesList"))])
);

function exportToJsonFile() {
  const quotesList = JSON.stringify(quotes, "Empty", 2);
  const blob = new Blob([quotesList], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotesList.json";
  link.click();
}
// import quotes from a json file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.readAsText(event.target.files[0]);
  fileReader.onload = function (event) {
    // Load data from file
    const importedQuotes = JSON.parse(event.target.result);
    saveQuotes(importedQuotes);
  };
}
// function to save quotes list to Local Storage
function saveQuotes(importedQuotes) {
  quotes = [...importedQuotes];
  localStorage.setItem("quotesList", JSON.stringify(quotes));
  alert("quotes loaded successfully");
}
