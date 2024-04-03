// Created variables to store API details
const apiKey = "a7e623df466f51b11cf869355c04d5f0";
const cityName = "Melbourne";
const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${apiKey}`;


function geoAPI() {
    fetch(
        locationUrl
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.length);
            if (data.length == 0) {
                alert("Location not found")
            } else {
                weatherAPI(data[0].lat, data[0].lon);
            }
        });
}

function weatherAPI(lat, lon) {

    console.log(lat);
    console.log(lon);

    fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length == 0) {
                alert("No weather information available");
            } else {
                console.log(data.list);
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

        console.log(`${count}`);
        console.log(`${i}`);

        if (count > 39) {
            count = 39;
        }

        // Get next set of card ID elements each loop
        let cardHeaderEl = document.getElementById(`card-header-${i}`);
        let cardIconEl = document.getElementById(`icon-day-${i}`);
        let cardTempEl = document.getElementById(`card-temp-${i}`);
        let cardWindEl = document.getElementById(`card-wind-${i}`);
        let cardHumidityEl = document.getElementById(`card-humidity-${i}`);
        let today = dashboardData[count].dt_txt//.slice(0, 10);

        // Update card elements with each loop
        cardHeaderEl.textContent = today;
        // Get weather icon provided by openweathermap.org
        cardIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${dashboardData[count].weather[0].icon}@2x.png`)
        cardTempEl.textContent = `Temp: ${dashboardData[count].main.temp}${deg}C`;
        cardWindEl.textContent = `Wind: ${dashboardData[count].wind.speed} Km/H`;
        cardHumidityEl.textContent = `Humidity: ${dashboardData[count].main.humidity}%`;

        count = count + 8;
    }
}

geoAPI();