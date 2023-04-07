//let apiKey = "67628a8e6b77943e6a0a6b36c4e89eec"
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

function displayCurrentTime() {
  const now = new Date();
  const options = { hour: "numeric", minute: "numeric" };
  const currentTime = now.toLocaleTimeString([], options);
  document.getElementById("time").textContent = currentTime;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  const year = now.getFullYear();
  const currentDate = now.getDate();
  document.getElementById(
    "current-date"
  ).textContent = `${day}, ${month} ${currentDate}, ${year}`;

  console.log(now);
}

window.onload = displayCurrentTime;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class ="row justify-content-evenly">';
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">${day}</div>
        <img
          src="https://openweathermap.org/img/wn/10d@2x.png"
          alt="Weather Icon"/>
          <br/>
        <span class="forecast-max">--</span>/<span class="forecast-min">--</span>
      </div>`; 
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  console.log(response.data);

  fahrenheitTemperature = response.data.main.temp;

  let temperature = Math.round(fahrenheitTemperature);
  let displayTemp = document.querySelector(".current-temp");
  displayTemp.innerHTML = `${temperature}`;
  let changeCity = document.querySelector(".current-city");
  changeCity.innerHTML = response.data.name;
  let temp_max = Math.round(response.data.main.temp_max);
  let changeMaxTemp = document.querySelector("#max-temp");
  changeMaxTemp.innerHTML = `${temp_max}`;
  let temp_min = Math.round(response.data.main.temp_min);
  let changeMinTemp = document.querySelector("#min-temp");
  changeMinTemp.innerHTML = `${temp_min}`;
  let humidity = Math.round(response.data.main.humidity);
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `${humidity}%`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let changeFeelsLike = document.querySelector("#feels-like");
  changeFeelsLike.innerHTML = `${feelsLike}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let changeWindSpeed = document.querySelector("#windspeed");
  changeWindSpeed.innerHTML = `${windSpeed} mph`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function currentPosition(position) {
  let apiKey = "67628a8e6b77943e6a0a6b36c4e89eec";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "67628a8e6b77943e6a0a6b36c4e89eec";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

displayForecast();

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) / 1.8;

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", showGeoLocation);

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", searchCity);

let celsius = document.querySelector("#current-celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

let fahrenheit = document.querySelector("#current-fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);
