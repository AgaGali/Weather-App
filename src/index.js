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
    "Saturday"
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
    "December"
  ];
  let month = allMonths[trueDay.getMonth()];
  let day = weekDays[trueDay.getDay()];
  let todayDate = trueDay.getDate();
  let formattedDate = `${day}, ${todayDate}, ${month}`;
  return formattedDate;
}
let fullDate = document.querySelector("div.date");
fullDate.innerHTML = setDay(date);

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temp-today").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New york");

function changeDegrees(event) {
  event.preventDefault();
  let temp = document.querySelector("span.temp-today");
  let fahrenheitTemperature = Math.round((-5 * 9) / 5 + 32);
  temp.innerHTML = fahrenheitTemperature;
}

let fahrenheitSwitch = document.querySelector("#degreesF");
fahrenheitSwitch.addEventListener("click", changeDegrees);

function changeDegreesToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("span.temp-today");
  temp.innerHTML = "-5";
}

let celciusSwitch = document.querySelector("#degreesC");
celciusSwitch.addEventListener("click", changeDegreesToCelcius);
