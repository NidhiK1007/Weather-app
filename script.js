// Step 1: Get elements from HTML
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// Step 2: Add click event to button
searchBtn.addEventListener('click', () => {
  const cityName = cityInput.value.trim();
  if (cityName === '') {
    weatherInfo.innerHTML = `<p>Please enter a city name!</p>`;
    return;
  }

  // Step 3: Call the weather API
  const apiKey = '154415600ab5da3a957a6b30f793386d';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  // Step 4: Fetch data from API
  console.log("Fetching:", url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>City not found!</p>`;
        return;
      }

      // 👇 Add these two lines for debugging
      console.log("Raw wind data:", data.wind);
      console.log("Coordinates:", data.coord);

      const now = new Date();
      const date = now.toLocaleDateString('en-GB'); // 04/11/25
      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      const windSpeedMs = data.wind.speed;
      const windKmh = (windSpeedMs * 3.6).toFixed(1); // converts m/s → km/h with 1 decimal

      // Step 5: Show weather details
      weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>📅 Date:</strong> ${date}</p>
        <p><strong>🕒 Time:</strong> ${time}</p>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${windKmh} km/h</p>
      `;
    })
    .catch(() => {
      weatherInfo.innerHTML = `<p>Error fetching data. Try again!</p>`;
    });
});
