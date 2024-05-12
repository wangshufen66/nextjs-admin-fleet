function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage example
function search(query) {
  // Perform search operation here
  console.log(`Searching for "${query}"...`);
}

const debouncedSearch = debounce(search, 300);

// Call debouncedSearch function
debouncedSearch('apple');
debouncedSearch('banana');
debouncedSearch('cherry');

function calculateDaysBetweenDates(be, en) {
  const diff = en.getTime() - be.getTime();
  return diff / (1000 * 60 * 60 * 24);
}

// find all images without alternate text
// and give them a red border
document.querySelectorAll('img:not([alt])').forEach((img) => {
  img.style.border = '5px solid red';
});
function process() {}

// Express server on port 3000
const express = require('express');
const app = express();
const port = 3000;

// Return the current time
app.get('/time', (req, res) => {
  res.send(new Date().toLocaleTimeString());
});
