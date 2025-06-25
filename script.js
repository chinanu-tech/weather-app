const apikey = '3eeaa327757a1c4e44c937e03bb9399b';

function getWeather() {
  const city = document.getElementById('city').value.trim();

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      alert('Error fetching current weather data. Please try again.');
    });

  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayHourlyForecast(data.list);
    })
    .catch(error => {
      console.error('Error fetching hourly forecast data:', error);
      alert('Error fetching hourly forecast data. Please try again.');
    });
}

function displayWeather(data) {
  const temperatureDiv = document.getElementById('temperature_div');
  const weatherDiv = document.getElementById('weather_info');
  const weatherIcon = document.getElementById('weather_icon');

  temperatureDiv.innerHTML = '';
  weatherDiv.innerHTML = '';
  weatherIcon.src = '';

  if (data.cod === '404') {
    weatherDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp); // Already in °C
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    temperatureDiv.innerHTML = `<p>${temperature}°C</p>`;
    weatherDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly_forecast');
  hourlyForecastDiv.innerHTML = '';

  const next8Hours = hourlyData.slice(0, 8);

  next8Hours.forEach(item => {
    const dataTime = new Date(item.dt * 1000);
    const hour = dataTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
      <div class="hourly_item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="hourly weather icon" />
        <span>${temperature}°C</span>
      </div>
    `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}




