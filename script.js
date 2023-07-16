

let currCity = 'palakkad';
let unit = 'metric';

let city = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-dateTime");
let weather_forecast = document.querySelector(".weather-forecast");
let weather_temperature =document.querySelector(".weather-temperature")
let weather_icon=document.querySelector(".weather-icon")
let weather_minMax = document.querySelector(".weather-minMax")
let weather_realFeel = document.querySelector(".weather-realFeel")
let humidity =document.querySelector(".weather-humidity")
let wind =document.querySelector(".weather-wind")
let pressure =document.querySelector(".weather-pressure")
let weather_search = document.querySelector(".weather-search")


weather_search.addEventListener("submit", e => {
    let search = document.querySelector(".weather-searchForm")
    e.preventDefault()
    currCity =search.value 
    getWeather()
    search.value=""

})



function convertTimeStamp(timeStamp) {
    const date = new Date(timeStamp * 1000);
  
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "Asia/Kolkata", // Time zone for Indian Standard Time (IST)
      hour12: true,
    };
  
    return date.toLocaleString("en-IN", options);
  }
  
  // Get the current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  // Display the current time in IST
//   console.log(convertTimeStamp(currentTimestamp));
  

                //units
                const celsiusButton = document.querySelector(".weather-unit-celsius");
                const fahrenheitButton = document.querySelector(".weather-unit-farenheit");
                
                if (celsiusButton) {
                  celsiusButton.addEventListener("click", () => {
                    if (unit !== "metric") {
                      unit = "metric";
                      getWeather();
                    }
                  });
                }
                
                if (fahrenheitButton) {
                  fahrenheitButton.addEventListener("click", () => {
                    if (unit !== "imperial") {
                      unit = "imperial";
                      getWeather();
                    }
                  });
                }
                
                  
// Convert country code to name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(['en'], { type: "region" });
    return regionNames.of(country);
}

function getWeather() {
    const API_KEY = "1aee3c6fe8e17e330032c34bd0e6b300";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${unit}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
            city.innerHTML = `${data.name}`;
            dateTime.innerHTML = convertTimeStamp(currentTimestamp);
            weather_forecast.innerHTML = `<p>${data.weather[0].description}</p>`;
            weather_temperature.innerHTML =`${data.main.temp.toFixed(2)}&#176`
            weather_icon.innerHTML =`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`
            weather_minMax.innerHTML =`<p>min:${data.main.temp_min.toFixed(2)}&#176</p>
                                       <p>max:${data.main.temp_max.toFixed(2)}&#176</p>`
            
            weather_realFeel.innerHTML = `${data.main.feels_like.toFixed(2)}&#176`
            humidity.innerHTML =`${data.main.humidity}%`
            wind.innerHTML = `${data.wind.speed} ${unit ==="imperial"?"mPh" : "m/s"}`
            pressure.innerHTML = `${data.main.pressure} hPa`  


        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

document.addEventListener("DOMContentLoaded", getWeather);

