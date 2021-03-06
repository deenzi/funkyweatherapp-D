let now = new Date();
let tod = document.querySelector("#today-date");

let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();

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
  "Dec"
];
let month = months[now.getMonth()];
let hour = now.getHours();
let min = now.getMinutes();
let year = now.getFullYear();

tod.innerHTML = `Today, ${day} ${date}. ${month}. ${year} - ${hour}:0${min} `;

let go = document.querySelector("#search-form");
go.addEventListener("submit", searching);

function searching(event) {
  event.preventDefault();
  let mainCity = document.querySelector("#main-city");
  let citySearch = document.querySelector("#input-val");
  mainCity.innerHTML = `${citySearch.value}`;
  searchCity(citySearch.value);
}
function searchCity(city) {
  let apiKey = "305b486110b57d0ffea2de58e32c75a8";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios.get(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`).then(showTemp);
}
function showTemp(response) {
  let city = document.querySelector("#main-city");
  let temp = document.querySelector("#number-degrees");
  let roundedTemp = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind-speed");
  let roundedWind = Math.round(response.data.wind.speed);
  let precip = document.querySelector("#precipitation");
  let descriptionWord = document.querySelector("#description");
  temp.innerHTML = `${roundedTemp} °C`;
  city.innerHTML = response.data.name;
  wind.innerHTML = `windspeed ${roundedWind} Km/s`;
  precip.innerHTML = `humidity ${response.data.main.humidity} %`;
  descriptionWord.innerHTML = response.data.weather[0].description;
  
  let weatherIcon = document.querySelector("#emoji-today");
  weatherIcon.setAttribute(
    "src","http://www.openweathermap.org/img/wn/${response.data.weater[0].icon}@2x.png");
}

// No Bonus for me 🤷

function changeToFahrenheit(event) {
  event.preventDefault();
  let degreeValue = document.querySelector("#number-degrees");

  degreeValue.innerHTML = 65;
}

let fahrenheitLink = document.querySelector("a");
fahrenheitLink.addEventListener("click", changeToFahrenheit);
