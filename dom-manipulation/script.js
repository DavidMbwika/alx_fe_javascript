let quotes = [
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
  { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerText = quotes[randomIndex].text;
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
      updateQuotesDisplay();
      saveQuotes(); // Function to save quotes to local storage
      clearInputFields();
  } else {
      alert("Please enter both a quote and a category.");
  }
}

function clearInputFields() {
  document.getElementById("newQuoteText").value = '';
  document.getElementById("newQuoteCategory").value = '';
}

function updateQuotesDisplay() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ''; // Clear current display
  quotes.forEach(quote => {
      const quoteElement = document.createElement("div");
      quoteElement.innerText = `${quote.text} - ${quote.category}`;
      quoteDisplay.appendChild(quoteElement);
  });
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
      updateQuotesDisplay();
  }
}

// Call loadQuotes on page load
window.onload = loadQuotes;