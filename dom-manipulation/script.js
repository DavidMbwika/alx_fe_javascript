// Array to hold quote objects
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Get busy living or get busy dying.", category: "Life" },
  { text: "You miss 100% of the shots you don’t take.", category: "Motivation" },
  { text: "The best way to predict the future is to create it.", category: "Inspiration" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<blockquote>"${quotes[randomIndex].text}"</blockquote><cite>${quotes[randomIndex].category}</cite>`;
}

// Function to create the add quote form
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteButton">Add Quote</button>
  `;

  document.body.appendChild(formContainer);

  // Add event listener to the new button
  document.getElementById('addQuoteButton').addEventListener('click', addQuote);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('Quote added successfully!');
  } else {
      alert('Please enter both quote and category.');
  }
}

// Event listener for the button to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the add quote form when the page loads
createAddQuoteForm();

// do not touch code up there

// json shit 

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
  }
}

// Function to export quotes to a JSON file
function exportQuotes() {
  const jsonQuotes = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonQuotes], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load quotes from local storage when the application initializes
loadQuotes();

// Add event listener for the export button
document.getElementById('exportQuotesButton').addEventListener('click', exportQuotes);

//do not touch code above this line good work

// Function to add a new quote
// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes(); // Save the updated quotes to local storage
      populateCategories(); // Update the category dropdown
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('Quote added successfully!');
  } else {
      alert('Please enter both quote and category.');
  }
}

// Function to populate the category filter dropdown
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = new Set(quotes.map(quote => quote.category)); // Get unique categories using map

  // Clear existing options except for the first one
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Populate the dropdown with unique categories
  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const quoteDisplay = document.getElementById('quoteDisplay');

  // Filter quotes based on the selected category
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  // Display the filtered quotes
  if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      quoteDisplay.innerHTML = `<blockquote>"${filteredQuotes[randomIndex].text}"</blockquote><cite>${filteredQuotes[randomIndex].category}</cite>`;
  } else {
      quoteDisplay.innerHTML = "No quotes found for this category.";
  }

  // Save the last selected category to local storage
  localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Load the last selected category from local storage when the application initializes
function loadLastSelectedCategory() {
  const lastCategory = localStorage.getItem('lastSelectedCategory');
  if (lastCategory) {
      document.getElementById('categoryFilter').value = lastCategory;
      filterQuotes(); // Call filterQuotes to display the correct quote
  }
}

// Call these functions during initialization
populateCategories();
loadLastSelectedCategory();