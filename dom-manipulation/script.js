// Initialize the quotes array
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
  // Check if there are quotes in the array
  if (quotes.length > 0) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    // Get the random quote
    const randomQuote = quotes[randomIndex];
    // Display the quote
    document.getElementById("quoteDisplay").innerHTML = `
      <p>${randomQuote.text}</p>
      <p>Category: ${randomQuote.category}</p>
    `;
  } else {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
  }
}

// Function to create the add quote form
function createAddQuoteForm() {
  const formHTML = `
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", formHTML);
}

// Function to add a new quote
function addQuote() {
  // Get the new quote text and category
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
  // Create a new quote object
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };
  
  // Add the new quote to the quotes array
  quotes.push(newQuote);
  
  // Clear the form fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  
  // Show the new quote
  showRandomQuote();
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Create the add quote form
  createAddQuoteForm();
  
  // Show a random quote initially
  showRandomQuote();
  
  // Add an event listener to the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Modify the addQuote function to save quotes after adding a new one
function addQuote() {
  // Get the new quote text and category
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
  // Create a new quote object
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };
  
  // Add the new quote to the quotes array
  quotes.push(newQuote);
  
  // Save the quotes to local storage
  saveQuotes();
  
  // Clear the form fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  
  // Show the new quote
  showRandomQuote();
}

// Modify the initialization to load quotes from local storage
document.addEventListener("DOMContentLoaded", () => {
  // Load quotes from local storage
  loadQuotes();
  
  // Create the add quote form
  createAddQuoteForm();
  
  // Show a random quote initially
  showRandomQuote();
  
  // Add an event listener to the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});