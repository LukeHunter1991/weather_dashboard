// Created variables to store API details
const apiKey = "a7e623df466f51b11cf869355c04d5f0";
const cityName = "Melbourne";
const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${apiKey}`;

// Created variables to store dashboard elements
const dashTempEl = document.getElementById("dash-top-temp");
const dashWindEl = document.getElementById("dash-top-wind");
const dashHumidity = document.getElementById("dash-top-humidity");


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
            console.log(data.list);
            if (data.length == 0) {
                alert("No weather information available");
            } else {
                console.log(data.list);
                UpdateDashTop(data.list);
            }
        });
}


function UpdateDashTop(dashboardData) {
    const deg = '\u00B0';
    dashTempEl.textContent = `Temp: ${dashboardData[0].main.temp}${deg}C`;
    dashWindEl.textContent = `Wind: ${dashboardData[0].wind.speed} Km/H`;
    dashHumidity.textContent = `Humidity: ${dashboardData[0].main.humidity}%`;
}

geoAPI();