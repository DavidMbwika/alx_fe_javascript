let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Opportunity" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('quoteDisplay').innerText = quotes[randomIndex].text;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully');
    populateCategories();
  }
}
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.innerText = category;
    categoryFilter.appendChild(option);
  });
}
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    document.getElementById('quoteDisplay').innerText = filteredQuotes[randomIndex].text;
  } else {
    document.getElementById('quoteDisplay').innerText = 'No quotes available for the selected category.';
  }
}

document.addEventListener('DOMContentLoaded', populateCategories);
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
    populateCategories();
  }
}

document.addEventListener('DOMContentLoaded', loadQuotes);
function exportToJsonFile() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotes));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', 'quotes.json');
  downloadAnchor.click();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

document.getElementById('importFile').addEventListener('change', importFromJsonFile);
function syncWithServer() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      // Simulate server updates by adding random quotes
      const serverQuotes = data.slice(0, 3).map(post => ({
        text: post.title,
        category: 'Server'
      }));
      quotes.push(...serverQuotes);
      saveQuotes();
      alert('Data synced with server');
    });
}

setInterval(syncWithServer, 30000); // Sync every 30 seconds
