
//day time
let currentDayTime = new Date();
  console.log(currentDayTime);
  console.log(currentDayTime.getDay());
  console.log(currentDayTime.getDate());
  console.log(currentDayTime.getMonth());
  console.log(currentDayTime.getHours);
  console.log(currentDayTime.getMinutes);

let h2 = document.querySelector("h2");

function formatDayTime(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    let currentDate = date.getDate();
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let hour = currentDayTime.getHours();

    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = currentDayTime.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    
    let formattedDayTime = `${day}, ${currentDate} ${month}, ${hour}:${minutes}`;
    h2.innerHTML = formattedDayTime;
    return formattedDayTime;
  }  
  console.log(formatDayTime(new Date));
  
  //CITY / feels like
  function displayWeatherCondition(response) {
    document.querySelector("#city-name").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#feels-like-js").innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
    document.querySelector("#temp-max").innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  document.querySelector("#humidity-js").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-js").innerHTML = `${response.data.wind.speed} km/h`;
  document.querySelector("#visibility-js").innerHTML = `${response.data.visibility}%`;
  document.querySelector("#description-js").innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "7ec53300c1e61afc2dfa56d235a9d50a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

//current location
function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7ec53300c1e61afc2dfa56d235a9d50a";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let button = document.querySelector("#button-location");
button.addEventListener("click", getCurrentPosition);


let form = document.querySelector("#city");
form.addEventListener("submit", handleSubmit);


//fahrenheit =  Math.round(9/5 * weather[city].temp + 32);