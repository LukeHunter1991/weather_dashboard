const apiKey = "a7e623df466f51b11cf869355c04d5f0";
const cityName = "Melbourne";
const limit = "1";
const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${limit}&appid=${apiKey}`;
let locationData = "";
function geoAPI() {
    fetch(
        locationUrl
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.length);
            if (data.length == 0) {
                alert("Location not found")
            } else {
                console.log(data[0].lat);
            }

        });
}

geoAPI();