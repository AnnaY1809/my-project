function formatDate(timestamp) {
  let now = new Date(timestamp);
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

  return `${day} ${date} ${month} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            ${formatDay(forecastDay.dt)}
            <p>${Math.round(forecastDay.temp.day)} C</p>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
            />
          </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `bc46bb9463ea12dcf8f914750ddd46be`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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
  tempCelsius = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#currentTime");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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

function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  degreeCelsius.classList.remove("active");
  degreeFahrenheit.classList.add("active");
  let tempF = Math.round(tempCelsius * 1.8 + 32);
  temperature.innerHTML = tempF;
}
function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  degreeCelsius.classList.add("active");
  degreeFahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(tempCelsius);
}

let tempCelsius = null;

let degreeCelsius = document.querySelector("#celsius");
let degreeFahrenheit = document.querySelector("#fahrenheit");

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
