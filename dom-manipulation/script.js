    // Array to hold quotes, initially loaded from local storage if available
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [
      { text: "The best way to predict the future is to create it.", category: "Inspiration" },
      { text: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
      { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Motivation" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Get busy living or get busy dying.", category: "Life" }
    ];

    // Function to save quotes to local storage
    function saveQuotes() {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Function to display a random quote
    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quoteDisplay = document.getElementById('quoteDisplay');
      const selectedQuote = quotes[randomIndex];

      quoteDisplay.innerHTML = `<p class="quote-text">${selectedQuote.text}</p><p class="quote-category">- ${selectedQuote.category}</p>`;
      
      // Save the last viewed quote in session storage
      sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote));
    }

    // Load the last viewed quote on page load from session storage, if available
    function loadLastViewedQuote() {
      const lastQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
      if (lastQuote) {
        document.getElementById('quoteDisplay').innerHTML = `<p class="quote-text">${lastQuote.text}</p><p class="quote-category">- ${lastQuote.category}</p>`;
      } else {
        showRandomQuote();
      }
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

    // Function to add a new quote
    function addQuote(text, category) {
      quotes.push({ text, category });
      saveQuotes(); // Save to local storage

      // Clear the input fields
      document.getElementById('quoteText').value = '';
      document.getElementById('quoteCategory').value = '';

      alert('Quote added successfully!');
    }

    // Function to export quotes as a JSON file
    document.getElementById('exportButton').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotes.json';
      a.click();
      URL.revokeObjectURL(url);
    });

    // Function to import quotes from a JSON file
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
    
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

    // Initial setup
    document.getElementById('newQuoteButton').addEventListener('click', showRandomQuote);
    createAddQuoteForm();

    // Load the last viewed quote if session storage has it, otherwise display a random quote
    loadLastViewedQuote();