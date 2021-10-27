const inputBox = document.querySelector('#inputBox');
const searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', getWeather);
inputBox.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
})

function getWeather() {

    window.addEventListener('load',() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                let {latitude,longitude} = position.coords;
                const geo_url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9cfbd8ac965b4333812825f5f2f74009`;

                fetch(geo_url).then(res => res.json()).then(location => {
                    const {city} = location.results[0].components;
                    inputBox.value = city;
                    getWeather();
                });
            })
        }
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputBox.value}&appid=beacc3e6f01c2627d32bda587123b275`;

    fetch(url).then(response => response.json()).
    then(result => {
        const {description, icon} = result.weather[0];
        const {temp, feels_like, pressure, humidity} = result.main;
        const {speed} = result.wind;
        const {country} = result.sys;
        const {name} = result;
        document.querySelector('.weather-desc').textContent = description;
        document.querySelector('.city').textContent = `${name}, ${country}`;
        document.querySelector('.feels-like').innerHTML = `Feels like ${Math.round(feels_like - 272)}&deg;C`;
        document.querySelector('.temp').innerHTML = `${Math.round(temp - 272)}&deg;C`;
        document.querySelector('.humidity_value').textContent = `${humidity}%`;
        document.querySelector('.pressure_value').textContent = `${pressure} hPa`;
        document.querySelector('.wind').textContent = `${speed} m/s`;
        document.querySelector('#icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }).catch(err => {
        //    let errElement = document.querySelector('.errElement');
        //    errElement.textContent = "No City Found";
    })
}
getWeather();

//kadafih126@d3bb.com
