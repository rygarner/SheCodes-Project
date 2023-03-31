//let apiKey = "67628a8e6b77943e6a0a6b36c4e89eec"
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

function displayCurrentTime() {
  const now = new Date();
  const options = { hour: "numeric", minute: "numeric" };
  const currentTime = now.toLocaleTimeString([], options);
  document.getElementById("time").textContent = currentTime;
}

window.onload = displayCurrentTime;

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temp_max = Math.round(response.data.main.temp_max);
  let temp_min = Math.round(response.data.main.temp_min);
  let displayTemp = document.querySelector(".current-temp");
  displayTemp.innerHTML = `${temperature}℉`;
  let changeCity = document.querySelector(".current-city");
  changeCity.innerHTML = response.data.name;
  let changeMaxTemp = document.querySelector("#max-temp");
  changeMaxTemp.innerHTML = `${temp_max}`;
  let changeMinTemp = document.querySelector("#min-temp");
  changeMinTemp.innerHTML = `${temp_min}`;
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

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", showGeoLocation);

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", searchCity);
