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
let cityname = document.querySelector("h1");
let apiKey = "9b9238de779b229d195c2b6f0ba8b479";
let apiEndpoint = `https://api.openweathermap.org/data/2.5/`;
let units = "Metric";
let city = "Poole";
let apiUrl = `${apiEndpoint}find?q=${city}&units=${units}&appid=${apiKey}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
             <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <div>
              <span class="forecast-temp-max"><strong>${Math.round(
                forecastDay.temp.max
              )}??</strong> </span>|
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}??</span>
            </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coordinates) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(displayForecast);
}
axios.get(apiUrl).then(showTemperature);
function showTemperature(response) {
  let iconElement = document.querySelector("#weather-icon");
  let locationName = response.data.list[0].name;
  let country = response.data.list[0].sys.country;

  celsiusTemperature = response.data.list[0].main.temp;
  celsiusTempMax = response.data.list[0].main.temp_max;
  celsiusTempMin = response.data.list[0].main.temp_min;
  celsiusFeelsLike = response.data.list[0].main.feels_like;

  let temperature = Math.round(celsiusTemperature);
  let tempFeels = Math.round(celsiusFeelsLike);
  let highTemp = Math.round(celsiusTempMax);
  let lowTemp = Math.round(celsiusTempMin);
  let humidityLevel = response.data.list[0].main.humidity;
  let weatherDescrip = response.data.list[0].weather[0].description;
  let windSpeed = Math.round(response.data.list[0].wind.speed);

  currentTemp.innerHTML = `${temperature}`;
  feels.innerHTML = `Feels like: ${tempFeels}??`;
  humid.innerHTML = `Humidity: ${humidityLevel}%`;
  maxTemp.innerHTML = `${highTemp}??`;
  minTemp.innerHTML = `${lowTemp}??`;
  wind.innerHTML = `Windspeed: ${windSpeed}km/h`;
  cityname.innerHTML = `${locationName}, ${country}`;
  currentCondition.innerHTML = `Currently: ${weatherDescrip}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.list[0].weather[0].description);

  getForecast(response.data.list[0].coord);
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
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${units}`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function updateLocationDetails(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusTempMax = response.data.main.temp_max;
  celsiusTempMin = response.data.main.temp_min;
  celsiusFeelsLike = response.data.main.feels_like;
  let iconElement = document.querySelector("#weather-icon");
  let temperature = Math.round(celsiusTemperature);
  let feelsLike = Math.round(celsiusFeelsLike);
  let temperatureMax = Math.round(celsiusTempMax);
  let temperatureMin = Math.round(celsiusTempMin);
  let locationName = response.data.name;
  let country = response.data.sys.country;
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  currentTemp.innerHTML = `${temperature}`;
  maxTemp.innerHTML = `${temperatureMax}`;
  minTemp.innerHTML = `${temperatureMin}`;
  feels.innerHTML = `Feels like: ${feelsLike}`;
  humid.innerHTML = `Humidity: ${humidity}%`;
  condition.innerHTML = `Currently: ${description}`;
  cityname.innerHTML = `${locationName}, ${country}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
