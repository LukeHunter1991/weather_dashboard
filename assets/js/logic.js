const apiKey = "a7e623df466f51b11cf869355c04d5f0";
const cityName = "Melbourne";
const limit = "1";
const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${limit}&appid=${apiKey}`;
let weatherData = {};

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
                console.log(data);
                weatherData = weatherAPI(data[0].lat, data[0].lon);
                console.log(weatherData);
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
                console.log(data.list[0].main);
                return data.list[0].main;
            }
        });
}


geoAPI();