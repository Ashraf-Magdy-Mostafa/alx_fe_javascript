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
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("quotesList")) {
    console.log("RESTORING FORM LOCAL STORAGE");
    return (quotes = [...JSON.parse(localStorage.getItem("quotesList"))]);
  } else {
    console.log("filling LOCAL STORAGE");
    return localStorage.setItem("quotesList", JSON.stringify(quotes));
  }
});
window.addEventListener("DOMContentLoaded", () => {
  localStorage.getItem("latestFilter");
  selectMenu.value = localStorage.getItem("latestFilter");
  filterQuote({ target: selectMenu });
});

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
// function categoryFilter(event) {
//   let filteredQuotes = quotes.filter(
//     (quote) => quote.category === selectMenu.value
//   );
// }
function filterQuote(event) {
  const selectedCategory = event.target.value;
  let filteredQuotes = [];
  filteredQuotesContainer.innerHTML = "";
  localStorage.setItem("latestFilter", selectedCategory);

  if (selectedCategory === "all") {
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

async function fetchQuotesFromServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const serverQuotes = await response.json();
  const serverQuotesList = serverQuotes.map((quote) => ({
    id: quote.id,
    text: quote.name,
    category: quote.username,
  }));
  return serverQuotesList;
}
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = await JSON.parse(localStorage.getItem("quotesList"));
  /// get server and compare to local
  // if a quote isnt local then make it local - get it from server get data from local and update the array then push to LS
  serverQuotes.forEach((serverquote) => {
    // search local for a server quote
    // server quote find index of local storage
    const quoteIndex = localQuotes.findIndex(
      (quote) => quote.text === serverquote.text
    );
    if (quoteIndex !== -1) {
      localQuotes[quoteIndex] = serverquote;
      notification("Conflicts resolved by using data from Server");
    } else {
      localQuotes.push(serverquote);
      notification("Fetched and updated data from SERVER\nDATA SYNCED");
    }
  });
  localStorage.setItem("quotesList", JSON.stringify(localQuotes));
}
// fetchQuotesFromSver();
syncQuotes();

function notification(cause) {
  const notifacationContainer = document.getElementById("notifacation");
  notifacationContainer.innerHTML = `<p><b> Notifacation:</b> </p>
  <p>${cause}</p>`;
  setTimeout(() => {
    console.log("waiting");
    notifacationContainer.innerHTML = "";
  }, 5000);
}

setInterval(() => syncQuotes(), 20000);
