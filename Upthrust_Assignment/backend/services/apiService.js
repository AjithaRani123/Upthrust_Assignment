const axios = require("axios");

async function fetchExternalAPI(action) {
  try {
    if (action === "weather") {
      // Example using OpenWeatherMap
      const apiKey = process.env.WEATHER_API_KEY;
      const city = "Delhi";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const { temp } = response.data.main;
      const weather = response.data.weather[0].description;
      return `Weather in ${city}: ${weather}, ${temp}°C`;
    }

    if (action === "github") {
      const response = await axios.get(
        "https://api.github.com/search/repositories?q=stars:>50000&sort=stars"
      );
      const topRepo = response.data.items[0];
      return `Trending repo: ${topRepo.name} (${topRepo.stargazers_count} ⭐)`;
    }

    if (action === "news") {
      const apiKey = process.env.NEWS_API_KEY;
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
      );
      const topHeadline = response.data.articles[0].title;
      return `Top News: ${topHeadline}`;
    }

    return "Invalid action selected.";
  } catch (err) {
    console.error(err);
    return "Failed to fetch external API.";
  }
}

module.exports = { fetchExternalAPI };