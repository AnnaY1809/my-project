let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let todaysDay = document.querySelector("#currentTime");
todaysDay.innerHTML = `${day}, ${date} ${month}, ${hours}:${minutes}`;

function showHumidity(response) {
  let humidity = response.data.main.humidity;
  let messageH = `Humidity: ${humidity} %`;
  let hum = document.querySelector("#humidity");
  hum.innerHTML = messageH;
}

function showWind(response) {
  let wind = response.data.wind.speed;
  let messageW = `Wind: ${wind} km/h`;
  let windW = document.querySelector("#wind");
  windW.innerHTML = messageW;
}

function showCloud(response) {
  let cloud = response.data.weather[0].description;
  let messageC = `${cloud}`;
  let cloudC = document.querySelector("#cloud");
  cloudC.innerHTML = messageC;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `${temperature}`;
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = message;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity2");
  let city = document.querySelector("#searchCity");
  city.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "bc46bb9463ea12dcf8f914750ddd46be";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showHumidity);
  axios.get(apiUrl).then(showWind);
  axios.get(apiUrl).then(showCloud);
}

let form = document.querySelector("#cityForm");
form.addEventListener("submit", search);

function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = tempC;
}

function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let tempF = Math.round(tempC * 1.8 + 32);
  temperature.innerHTML = tempF;
}

let degreeCelsius = document.querySelector("#celsius");
let degreeFahrenheit = document.querySelector("#fahrenheit");
let tempC = 20;
degreeCelsius.addEventListener("click", celsius);
degreeFahrenheit.addEventListener("click", fahrenheit);

function showCurrentPositionWeather(response) {
  let currentCity = document.querySelector("#searchCity");
  currentCity.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let currentSky = document.querySelector("#cloud");
  currentSky.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bc46bb9463ea12dcf8f914750ddd46be";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentPositionWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentPosition");
button.addEventListener("click", getCurrentPosition);
