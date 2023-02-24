let date = new Date();

function setTime(trueTime) {
  let hour = trueTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = trueTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedTime = `${hour}:${minutes}`;
  return formattedTime;
}
let time = document.querySelector("div.time");
time.innerHTML = `Current time ${setTime(date)}`;

function setDay(trueDay) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = allMonths[trueDay.getMonth()];
  let day = weekDays[trueDay.getDay()];
  let todayDate = trueDay.getDate();
  let formattedDate = `${day}, ${todayDate}, ${month}`;
  return formattedDate;
}
let fullDate = document.querySelector("div.date");
fullDate.innerHTML = setDay(date);

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    
      <div class="col-2 week-weather">
        <div class="weekday">
          01.12 <br />
          ${day}
        </div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
          alt=""
          width="50"
        />
        <div class="temp">
          <span class="week-weather-temp-max">-2°</span>
          <span class="week-weather-temp-min">-10°</span>
        </div>
      </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let longitude = coordinates.longitude;
  let latitude = coordinates.latitude;
  let apiKey = "t2a4aa0f7820odf4388a012be243e28a";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("h2");
  let temperatureElement = document.querySelector("#temp-today");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let weatherIconElement = document.querySelector("#weatherIcon");
  celciusTemperature = Math.round(response.data.temperature.current);

  temperatureElement.innerHTML = celciusTemperature;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  weatherIconElement.setAttribute("src", response.data.condition.icon_url);
  weatherIconElement.setAttribute("alt", response.data.condition.icon);
  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "t2a4aa0f7820odf4388a012be243e28a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#citySearch");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  console.log(position);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "t2a4aa0f7820odf4388a012be243e28a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celciusTemperature = null;

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celciusSwitch.classList.remove("active");
  fahrenheitSwitch.classList.add("active");
  let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temp-today");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

let fahrenheitSwitch = document.querySelector("#degreesF");
fahrenheitSwitch.addEventListener("click", displayFahrenheitTemp);

function displayCelciusTemp(event) {
  event.preventDefault();
  celciusSwitch.classList.add("active");
  fahrenheitSwitch.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-today");
  temperatureElement.innerHTML = celciusTemperature;
}

let celciusSwitch = document.querySelector("#degreesC");
celciusSwitch.addEventListener("click", displayCelciusTemp);

searchCity("Warsaw");
