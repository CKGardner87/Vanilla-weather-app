function displayTime() {
  if (minutes < 10) {
    currentDayTime.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;
  }
}
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let currentDayTime = document.querySelector("#current-date-time");
currentDayTime.innerHTML = `Updated: ${day} ${hours}:${minutes}`;

let currentCondition = document.querySelector("#description");
let currentTemp = document.querySelector("#current-temp");
let humid = document.querySelector("#humidity");
let condition = document.querySelector("#description");
let feels = document.querySelector("#feels-like");
let minTemp = document.querySelector("#today-low");
let maxTemp = document.querySelector("#today-high");
let wind = document.querySelector("#wind-speed");
let iconElement = document.querySelector("condition-icon");
let cityname = document.querySelector("h1");
let apiKey = "9b9238de779b229d195c2b6f0ba8b479";
let apiEndpoint = `https://api.openweathermap.org/data/2.5/`;
let units = "Metric";
let city = "Poole";
let apiUrl = `${apiEndpoint}find?q=${city}&units=${units}&appid=${apiKey}`;
console.log(apiUrl);

axios.get(apiUrl).then(showTemperature);
function showTemperature(response) {
  console.log(response.data.list[0]);
  let locationName = response.data.list[0].name;
  let country = response.data.list[0].sys.country;
  let temperature = Math.round(response.data.list[0].main.temp);
  let humidityLevel = response.data.list[0].main.humidity;
  let tempFeels = Math.round(response.data.list[0].main.feels_like);
  let weatherDescrip = response.data.list[0].weather[0].description;
  let highTemp = Math.round(response.data.list[0].main.temp_max);
  let lowTemp = Math.round(response.data.list[0].main.temp_min);
  let windSpeed = Math.round(response.data.list[0].wind.speed);

  currentTemp.innerHTML = `${temperature}`;
  feels.innerHTML = `Feels like: ${tempFeels}`;
  humid.innerHTML = `Humidity: ${humidityLevel}%`;
  maxTemp.innerHTML = `${highTemp}`;
  minTemp.innerHTML = `${lowTemp}`;
  wind.innerHTML = `${windSpeed}km/h`;
  cityname.innerHTML = `${locationName}, ${country}`;
  currentCondition.innerHTML = `Currently: ${weatherDescrip}`;
  console.log(cityname);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForCity);

function searchForCity(event) {
  event.preventDefault();
  let findCity = document.querySelector("#city-search");
  let newCity = findCity.value;
  let units = "Metric";
  let apiUrl = `${apiEndpoint}find?q=${newCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", findCoords);

function findCoords() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  units = "Metric";
  let apiAddress = `${apiEndpoint}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiAddress).then(updateLocationDetails);
}

function updateLocationDetails(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let locationName = response.data.name;
  let country = response.data.sys.country;
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  currentTemp.innerHTML = `${temperature}ºC`;
  feels.innerHTML = `feels like ${feelsLike}ºC`;
  humid.innerHTML = `Humidity ${humidity}%`;
  condition.innerHTML = `${description}`;
  cityname.innerHTML = `${locationName}, ${country}`;
}
function convertToFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = (11 * 9) / 5 + 32;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(farenheitTemp);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);
