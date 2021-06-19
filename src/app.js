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

let currentTemp = document.querySelector("#current-temp");
let humid = document.querySelector("#humidity");
let condition = document.querySelector("#description");
let feels = document.querySelector("#feels-like");
let minTemp = document.querySelector("#today-low");
let maxTemp = document.querySelector("#today-high");
let apiKey = "9b9238de779b229d195c2b6f0ba8b479";
let apiEndpoint = `https://api.openweathermap.org/data/2.5/`;
let units = "Metric";
let apiUrl = `${apiEndpoint}find?q=Poole&units=${units}&appid=${apiKey}`;
console.log(apiUrl);

axios.get(apiUrl).then(showTemperature);
function showTemperature(response) {
  console.log(response.data.list[0]);
  let temperature = Math.round(response.data.list[0].main.temp);
  let humidityLevel = response.data.list[0].main.humidity;
  let tempFeels = Math.round(response.data.list[0].main.feels_like);
  let weatherDescrip = response.data.list[0].weather[0].main;
  let highTemp = Math.round(response.data.list[0].main.temp_max);
  let lowTemp = Math.round(response.data.list[0].main.temp_min);

  currentTemp.innerHTML = `${temperature}`;
  feels.innerHTML = `Feels like: ${tempFeels}`;
  humid.innerHTML = `Humidity: ${humidityLevel}%`;
  condition.innerHTML = `Currently: ${weatherDescrip}`;
  maxTemp.innerHTML = `${highTemp}`;
  minTemp.innerHTML = `${lowTemp}`;
}
