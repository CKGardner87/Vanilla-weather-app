let apiKey = "9b9238de779b229d195c2b6f0ba8b479";
let apiEndpoint = `https://api.openweathermap.org/data/2.5/`;
let units = "Metric";
let apiUrl = `${apiEndpoint}find?q=Poole&units=${units}&appid=${apiKey}`;
console.log(apiUrl);
