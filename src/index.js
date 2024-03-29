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
time.innerHTML = `Last updated ${setTime(date)}`;

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let fullDate = document.querySelector("div.date");
fullDate.innerHTML = setDay(date);

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    
      <div class="col-2 week-weather">
        <div class="weekday">
          01.12 <br />
          ${formatDay(forecastDay.time)}
         
        </div>
        
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt="weather icon"
          width="50"
        />
        <div class="temp">
          <span class="week-weather-temp-max">${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
          <span class="week-weather-temp-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
    `;
    }
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

switch (description) {
  case "clear sky":
    document
      .getElementById("fullPage")
      .setAttribute("style", "background-image: url('./images/clear-sky.jpg')");
  case "few clouds":
    document
      .getElementById("fullPage")
      .setAttribute(
        "style",
        "background-image: url('./images/few-clouds.jpg')"
      );
}

function changeBackground(description) {
  console.log(description);
  if (description === "clear sky") {
    document
      .getElementById("fullPage")
      .setAttribute("style", "background-image: url('./images/clear-sky.jpg')");
  }
  if (description === "few clouds") {
    document
      .getElementById("fullPage")
      .setAttribute(
        "style",
        "background-image: url('./images/few-clouds.jpg')"
      );
  }
  if (description === "scattered clouds") {
    document
      .getElementById("fullPage")
      .setAttribute(
        "style",
        "background-image: url('./images/scattered-clouds.jpg')"
      );
  }
  if (description === "broken clouds" || description === "overcast clouds") {
    document
      .getElementById("fullPage")
      .setAttribute(
        "style",
        "background-image: url('./images/broken-clouds.jpg')"
      );
  }
  if (description === "shower rain") {
    document
      .getElementById("fullPage")
      .setAttribute(
        "style",
        "background-image: url('./images/shower-rain.jpg')"
      );
  }
  if (description === "rain") {
    document
      .getElementById("fullPage")
      .setAttribute("style", "background-image: url('./images/rain.jpg')");
  }
  if (description === "thunderstorm") {
    document
      .getElementById("fullPage")
      .setAttribute(
        "style",
        "background-image: url('./images/thunderstorm.jpg')"
      );
  }
  if (description === "snow" || description === "light snow") {
    document
      .getElementById("fullPage")
      .setAttribute("style", "background-image: url('./images/snow.jpg')");
  }
  if (description === "mist") {
    document
      .getElementById("fullPage")
      .setAttribute("style", "background-image: url('./images/mist.jpg')");
  }
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
  let descriptionBackground = response.data.condition.description;
  changeBackground(descriptionBackground);
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
