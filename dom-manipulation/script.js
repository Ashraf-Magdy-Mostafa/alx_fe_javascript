let quotes = [
  { text: "h2o is 2 h and 1 o", category: "science" },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];
const quoteDisplay = document.getElementById("quoteDisplay");
const showRandomQuote = document.getElementById("newQuote");
const selectMenu = document.getElementById("categoryFilter");
const filteredQuotesContainer = document.getElementById("filtered-quotes");

window.addEventListener("DOMContentLoaded", () => randomQuote());
window.addEventListener("DOMContentLoaded", () => populateCategories());
window.addEventListener(
  "DOMContentLoaded",
  () => (quotes = [...JSON.parse(localStorage.getItem("quotesList"))])
);

// ADD NEW QUOTE TO QUOTES ARRAY
function createAddQuoteForm() {
  let quoteText = document.getElementById("newQuoteText");
  let quoteCategory = document.getElementById("newQuoteCategory");
  let newQuote = { text: quoteText.value, category: quoteCategory.value };
  localStorage.setItem("quotesList", JSON.stringify(quotes));
  sessionStorage.setItem("latestQuote", JSON.stringify(newQuote));
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

function getLatestQuote() {
  const latestQuote = JSON.parse(sessionStorage.getItem("latestQuote"));
  quoteDisplay.innerHTML = `<p> Latest Quote:</p>
 <p>text: ${latestQuote.text} </p>
  <p>category: ${latestQuote.category} </p> `;
}
function populateCategories() {
  // use map
  const categories = quotes.map((quote) => quote.category);
  const uniqueCategories = [...new Set(categories)];
  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    selectMenu.appendChild(option);
  });
}
function categoryFilter(event) {
  let filteredQuotes = quotes.filter(
    (quote) => quote.category === selectMenu.value
  );
}
function filterQuote(event) {
  localStorage.setItem("latestFilter", event.target.value);
  filteredQuotesContainer.innerHTML = "";
  let filteredQuotes = [];
  if (event.target.value === "all") {
    filteredQuotes = quotes;
  } else {
    filteredQuotes = quotes.filter(
      (quote) => quote.category === selectMenu.value
    );
  }

  filteredQuotes.forEach((quote) => {
    const quoteElement = document.createElement("p");
    quoteElement.innerHTML = `text: ${quote.text} | category: ${quote.category}`;
    filteredQuotesContainer.appendChild(quoteElement);
  });
}
