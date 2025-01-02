const container = document.querySelector(".container");

const apiKey = "484408e726f646fcaa97d4f71dbc75e8";
const country = "us";

let requestURL;

// Generate UI with placeholder fallback for missing data
const generateUI = (articles) => {
  container.innerHTML = ""; // Clear previous content

  for (let article of articles) {
    if (!article.title || !article.description || !article.urlToImage) {
      // Skip articles with missing data
      continue;
    }

    const card = document.createElement("div");
    card.classList.add("news-card");

    const imageUrl = article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image+Available";
    const title = article.title || "Title not available";
    const description = article.description || "Description not available.";
    const url = article.url || "#";

    card.innerHTML = `
      <div class="news-image-container">
        <img src="${imageUrl}" alt="News Image">
      </div>
      <div class="news-content">
        <div class="news-title">${title}</div>
        <div class="news-description">${description}</div>
        <a href="${url}" target="_blank" class="view-button">Read More</a>
      </div>
    `;

    container.appendChild(card);
  }
};

// Fetch news from the API
const getNews = async () => {
  container.innerHTML = "Loading news...";
  try {
    const response = await fetch(requestURL);
    if (!response.ok) throw new Error("Failed to fetch news.");
    const data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    container.innerHTML = `<p>${error.message}</p>`;
  }
};

// Select category and fetch news
const selectCategory = (category) => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  getNews();
};

// Initialize the app
const init = () => {
  const dateElement = document.getElementById("current-date");
  const yearElement = document.getElementById("current-year");

  const currentDate = new Date();
  dateElement.textContent = currentDate.toDateString();
  yearElement.textContent = currentDate.getFullYear();

  selectCategory("general");
};

window.onload = init;
