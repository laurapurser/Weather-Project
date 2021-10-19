let now = new Date();
let currentDate = document.querySelector("#date-line");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
currentDate.innerHTML = `${day}, ${hours}:${minutes} BST`;

function search(cityname) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiUrl}${cityname}&units=metric&appid=${apiKey}`)
    .then(showActualWeather);
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
        ${day}
    </br>
    <img src ="https://th.bing.com/th/id/OIP.dfVwM8AoNza3-RZ6HLna0gHaFo?pid=ImgDet&rs=1"
    width = "45"/>
  </br> <div class = "forecast-temp">13°C</div>
    </div>
    
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function retrieveCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityname = searchInput.value;
  search(cityname);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showActualWeather(response) {
  let heading = document.querySelector("#cardtitle");
  heading.innerHTML = `${response.data.name}`;
  let actualTemp = document.querySelector("#temp-number");
  actualTemp.innerHTML = Math.round(response.data.main.temp);
  let actualHumidity = document.querySelector("#actual-humidity");
  actualHumidity.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  let actualDescription = document.querySelector("#description");
  actualDescription.innerHTML = `${response.data.weather[0].description}`;
  let actualWindspeed = document.querySelector("#windspeed");
  actualWindspeed.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )}mph`;

  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  console.log(response);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let url = `https://api.openweathermap.org/data/2.5/weather?`;
  axios
    .get(`${url}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showActualWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFarTemp(event) {
  event.preventDefault();
  let farTemp = (celsiusTemp * 9) / 5 + 32;
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = Math.round(farTemp);
}
function displayCelTemp(event) {
  event.preventDefault();
  farLink.classList.remove("active");
  celLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;
let form = document.querySelector("form");
form.addEventListener("submit", retrieveCity);

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", getCurrentPosition);

search("New York");

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", displayFarTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", displayCelTemp);
