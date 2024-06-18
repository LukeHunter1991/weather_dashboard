// Created variables to store API details
const apiKey = "a7e623df466f51b11cf869355c04d5f0";
let cityName = "";
const searchEl = document.getElementById("search-form");

// Get search history from local storage
let searchList = JSON.parse(localStorage.getItem("searchList")) || [];
const historyEl = document.getElementById('history');

// Call function to get longitude and latitude details for weather API
function geoAPI() {
    fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${apiKey}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Display an alert if api call unsuccesful
            if (data.length == 0) {
                alert("Location not found")
            } else {
                weatherAPI(data[0].lat, data[0].lon);
            }
        });
}

// Get weather data
function weatherAPI(lat, lon) {

    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length == 0) {
                // Display an alert if api call unsuccesful
                alert("No weather information available");
            } else {
                UpdateDashboard(data.list);
            }
        });
}

function UpdateDashboard(dashboardData) {

    // Store degree symbol in variable to use in text content
    const deg = '\u00B0';

    let count = 0;
    // Update dashboard weather values for current day
    for (let i = 0; i < 6; i++) {

        // Ensures loop does not go beyond the bounds of the array
        if (count > 39) {
            count = 39;
        }

        // Get next set of card ID elements each loop
        let cardHeaderEl = document.getElementById(`card-header-${i}`);
        let cardIconEl = document.getElementById(`icon-day-${i}`);
        let cardTempEl = document.getElementById(`card-temp-${i}`);
        let cardWindEl = document.getElementById(`card-wind-${i}`);
        let cardHumidityEl = document.getElementById(`card-humidity-${i}`);
        let today = dashboardData[count].dt_txt.slice(0, 10);

        // Update card elements with each loop
        if (i === 0) {
            cardHeaderEl.textContent = cityName + " " + today;
        } else {
            cardHeaderEl.textContent = today;
        }

        // Get weather icon provided by openweathermap.org
        cardIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${dashboardData[count].weather[0].icon}@2x.png`)
        cardTempEl.textContent = `Temp: ${dashboardData[count].main.temp}${deg}C`;
        cardWindEl.textContent = `Wind: ${dashboardData[count].wind.speed} Km/H`;
        cardHumidityEl.textContent = `Humidity: ${dashboardData[count].main.humidity}%`;

        count = count + 8;
    }
}

const handleSearch = function (e) {

    e.preventDefault();
    // Get city that user has put into search input
    cityName = document.getElementById("search-city").value;
    geoAPI();

    // Add latest search to the start of the array to be displayed first. History is capped at  last 10 searches.
    searchList.unshift(cityName)
    if (searchList.length > 10) {
        searchList.pop();
    }
    // Update local storage and display updated search history
    localStorage.setItem('searchList', JSON.stringify(searchList));
    displaySearch();

    // Resets form
    searchEl.reset();

}

function displaySearch() {

    // Get latest search list
    searchList = JSON.parse(localStorage.getItem('searchList'));

    // Ensures history section is cleared to avoid duplicates
    historyEl.innerHTML = ""

    // Loops through items in search list and creates a button for each in the history section
    for (cities of searchList) {
        const cityHistory = document.createElement('div');
        cityHistory.setAttribute('class', 'cityHistory');
        cityHistory.textContent = cities;
        historyEl.append(cityHistory);
    }
}

// When city history item is clicked, get weather data for that city
function historySearch(e) {
    cityName = e.target.textContent;
    geoAPI();
}

// Display searchlist on page load if there is at least 1 city to display
if (searchList.length > 0) {
    displaySearch();
}

// Listen for search form submit
searchEl.addEventListener('submit', handleSearch);

// Add event listener for each city in history so they can be clicked to search
historyEl.addEventListener('click', historySearch);
