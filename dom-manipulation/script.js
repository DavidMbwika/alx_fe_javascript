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

// Function to add a new quote to the array and update the DOM
function addQuote(text, category) {
  // Add the new quote to the array
  quotes.push({ text, category });
  
  // Optionally, you can update the category dropdown if the category is new
  const categorySelect = document.getElementById('categorySelect');
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

// Event listeners for buttons
document.getElementById('generateQuoteButton').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteButton').addEventListener('click', () => {
  const text = document.getElementById('quoteText').value.trim();
  const category = document.getElementById('quoteCategory').value.trim();
  
  if (text && category) {
      addQuote(text, category);
  } else {
      alert('Please fill in both fields.');
  }
});

// Initial setup
showRandomQuote(); // Display a random quote on page load