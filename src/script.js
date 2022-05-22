let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let today = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${now.getHours()}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${now.getMinutes()}`;
}

let displayDate = `It is ${today} ${currentHour}:${currentMinute}`;
let todayForecast = document.querySelector("#today-forecast");
todayForecast.innerHTML = displayDate;

navigator.geolocation.getCurrentPosition(handlePosition);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "6ee249f42e799c5df8afd9d8221995b0";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(locationInformation);
}

function locationInformation(response) {
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", clickAlert);
  let localWeather = Math.round(response.data.main.temp);
  let currentlySubheading = document.querySelector("#currently-subheading");
  currentlySubheading.innerHTML = `${localWeather}`;
  let currentCityName = document.querySelector("#currently-title");
  let currentlyPlaceholder = response.data.name;
  currentCityName.innerHTML = `Currently in ${currentlyPlaceholder}`;
  let localWeatherDescription = response.data.weather[0].description;
  let currentWeatherSubheading = document.querySelector(
    "#current-weather-subheading"
  );
  let humidity = response.data.main.humidity;
  currentWeatherSubheading.innerHTML = `C, some ${localWeatherDescription} and ${humidity}% humidity`;
}

function clickAlert() {
  alert("You have changed your current location");
}

let locationInput = document.querySelector("#searching-bar");
locationInput.addEventListener("submit", locationSearch);

function locationSearch(event) {
  event.preventDefault();
  let locationOutput = document.querySelector("#search-bar");
  let pageTitle = document.querySelector("#page-title");
  if (locationOutput.value === undefined) {
    alert("We don't have a record of that city");
  } else {
    if (locationOutput.value) {
      let userSearch = locationOutput.value;
      pageTitle.innerHTML = `${userSearch}`;
      console.log(userSearch);
      userSearch = userSearch.toLowerCase();
      let unit = "metric";
      let userSearchApiKey = "6ee249f42e799c5df8afd9d8221995b0";
      let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${userSearchApiKey}&units=${unit}`;
      console.log(searchUrl);
      axios.get(searchUrl).then(changeTitleName);
    } else {
      alert("You're searching for a city without a name");
    }
  }
}
function changeTitleName(response) {
  let temperatureForChangingTitle = response.data.main.temp;
  temperatureForChangingTitle = Math.round(response.data.main.temp);
  let changingTitle = document.querySelector("#title-temp");
  changingTitle.innerHTML = `It's ${temperatureForChangingTitle}`;
}
