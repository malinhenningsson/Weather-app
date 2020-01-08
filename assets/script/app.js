/**
 * Weather app
 * 
 */

const renderError = (severity, msg) => {
    document.querySelector('#forecast').innerHTML = `<div class="alert alert-${severity}" role="alert">${msg}</div>`;
};

const renderPictureTimeOfDay = (data) => {
    if (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) {
        return "day.svg";
    } else {
        return "night.svg";
    }
}

const renderConditions = data => {
    let conditions = [];
    data.weather.forEach(item => {
        conditions.push(item.description);
    });
    return conditions;
}

const renderIcons = data => {
    let icon = [];
    data.weather.forEach(item => {
        icon.push(`<img src="http://openweathermap.org/img/wn/${item.icon}@2x.png">`);
    });
    return icon;
}

const renderCurrentWeather = data => {
    let timeWeatherUpdate = moment.unix(data.dt).utc();

    document.querySelector('#forecast').innerHTML = `
        <div class="card">
            <img src="assets/images/${renderPictureTimeOfDay(data)}" class="card-img-top">
            <div class="card-body">
            ${renderIcons(data).join(' ')}
                <p class="conditions">
                <span id="conditions">${renderConditions(data).join(', ')}</span>
                </p>
                <h5 class="card-title" id="city">${data.name} <span id="country">${data.sys.country}</span></h5>
                <p class="temp"><span id="temperature">${Math.round(data.main.temp)}</span>&deg;C</p>
                <p class="wind"><span id="windspeed">${data.wind.speed}</span>m/s</p>
                <p class="humidity"><span id="humidity">${data.main.humidity}</span>% humidity</p>
                <p class="lastupdate"><span id="lastupdate">Last updated: ${moment(timeWeatherUpdate).fromNow()} </span></p>
            </div>
        </div>`;

};

 document.querySelector('#search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.querySelector('#query').value;
    if (city.length < 2) {
        return;
    }
    
    getCurrentWeather(city)
        .then(data => {
            if (data.cod === 200) {
                renderCurrentWeather(data);
            } else if (data.cod === "404") {
                renderError('warning', 'City not found');
            } else {
                renderError('warning', data.message);
            }
        })
        .catch(err => {
            renderError('danger', err);
        })

    document.querySelector('#query').value = '';
 });