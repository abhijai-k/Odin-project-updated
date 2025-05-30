const API_KEY = "SDRGRGESGFSEKHFDAWDFGFDFDGS";

const form = document.getElementById("weather-form");
const input = document.getElementById("location-input");
const weatherDisplay = document.getElementById("weather-display");
const loading = document.getElementById("loading");

async function fetchWeather(location) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  return data;
}

function processWeatherData(data) {
  return {
    location: `${data.name}, ${data.sys.country}`,
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

function displayWeather(data) {
  weatherDisplay.innerHTML = `
    <h2>${data.location}</h2>
    <p>${data.temperature} °C</p>
    <p>${data.description}</p>
    <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon" />
  `;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  loading.classList.remove("hidden");
  weatherDisplay.innerHTML = "";

  try {
    const rawData = await fetchWeather(location);
    console.log("Raw Data:", rawData);
    const processed = processWeatherData(rawData);
    console.log("Processed:", processed);
    displayWeather(processed);
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherDisplay.innerHTML = `<p>Could not get weather data.</p>`;
  } finally {
    loading.classList.add("hidden");
  }
});
