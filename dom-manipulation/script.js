// Array to hold quote objects
const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Inspiration" },
  { text: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Motivation" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Get busy living or get busy dying.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');

  // Use innerHTML to set the text and style the quote
  quoteDisplay.innerHTML = `<p class="quote-text">${quotes[randomIndex].text}</p><p class="quote-category">- ${quotes[randomIndex].category}</p>`;
}

// Function to create the add quote form
function createAddQuoteForm() {
  const addQuoteForm = document.getElementById('addQuoteForm');
  addQuoteForm.innerHTML = `
      <label for="quoteText">Quote:</label>
      <textarea id="quoteText" rows="5" cols="50"></textarea>
      <br>
      <label for="quoteCategory">Category:</label>
      <select id="quoteCategory">
          <option value="Inspiration">Inspiration</option>
          <option value="Motivation">Motivation</option>
          <option value="Life">Life</option>
      </select>
      <br>
      <button id="addQuoteButton">Add Quote</button>
  `;

  // Add event listener to the add quote button
  document.getElementById('addQuoteButton').addEventListener('click', () => {
      const text = document.getElementById('quoteText').value.trim();
      const category = document.getElementById('quoteCategory').value.trim();
      
      if (text && category) {
          addQuote(text, category);
      } else {
          alert('Please fill in both fields.');
      }
  });
}

// Function to add a new quote to the array and update the DOM
function addQuote(text, category) {
  // Add the new quote to the array
  quotes.push({ text, category });
  
  // Optionally, you can update the category dropdown if the category is new
  const categorySelect = document.getElementById('quoteCategory');
  if (![...categorySelect.options].some(option => option.value === category)) {
      const newOption = document.createElement('option');
      newOption.value = category;
      newOption.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categorySelect.appendChild(newOption);
  }

  // Clear the input fields
  document.getElementById('quoteText').value = '';
  document.getElementById('quoteCategory').value = '';

  alert('Quote added successfully!');
}

// Event listener for the New Quote button
document.getElementById('newQuoteButton').addEventListener('click', showRandomQuote);

// Create the add quote form
createAddQuoteForm();

// Initial setup
showRandomQuote(); // Display a random quote on page load

// Function to add a new quote to the array and update the DOM
function addQuote(text, category) {
  // Add the new quote to the array
  quotes.push({ text, category });
  
  // Save quotes to local storage
  saveQuotes();

  // Clear the input fields
  document.getElementById('quoteText').value = '';
  document.getElementById('quoteCategory').value = '';

  alert('Quote added successfully!');
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const jsonQuotes = JSON.stringify(quotes);
  const blob = new Blob([jsonQuotes], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
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

// Event listener for the New Quote button
document.getElementById('newQuoteButton').addEventListener('click', showRandomQuote);

// Event listener for the Export button
document.getElementById('exportButton').addEventListener('click', exportToJsonFile);

// Event listener for the Import button
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Load quotes from local storage
loadQuotes();

// Create the add quote form
createAddQuoteForm();

// Initial setup
showRandomQuote(); // Display a random quote on page load