// Weather API: https://goweather.herokuapp.com/weather/Berlin
// IMG API: https://imsea.herokuapp.com/api/1?q=sunny

// ERROR IF CITY NOT FOUND

// Light drizzle, mist, sunny, Partly cloudy, 

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let weatherUI = document.querySelector(".weather__city");
let tempUI = document.querySelector(".weather__temp");
let windUI = document.querySelector(".weather__wind");
let descriptionUI = document.querySelector(".weather__description");
let day0UItemp = document.querySelector(".weather__day0__temperature");
let day1UItemp = document.querySelector(".weather__day1__temperature");
let day2UItemp = document.querySelector(".weather__day2__temperature");
let day0UIwind = document.querySelector(".weather__day0__wind");
let day1UIwind = document.querySelector(".weather__day1__wind");
let day2UIwind = document.querySelector(".weather__day2__wind");
let weekDay0UI = document.querySelector(".weather__day0__day");
let weekDay1UI = document.querySelector(".weather__day1__day");
let weekDay2UI = document.querySelector(".weather__day2__day");
let weatherDataUI = document.querySelector(".weather__data");
let weathererrorUI = document.querySelector(".weather__error");

let searchBtn = document.querySelector('.btn--new-city');
let converterBtn = document.querySelector('.weather__convertInput');

let celsius = true;
let showDataStatus = false;
let weatherData = new Object();

searchBtn.addEventListener("click", () => {
    getWeather();
});


// C/F converted btn
converterBtn.addEventListener("click", (e) => {
    if (converterBtn.checked) {
        celsius = true;
    } else {
        celsius = false;
    }
    updateWeather(weatherData.data, weatherData.city)
});

// fetch data
async function getWeather(e) {
    try {
        let city = document.querySelector('#city').value;
        const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`, { mode: 'cors' });
        const data = await response.json();
        // IF NO DATA ERROR
        if (!data.temperature && !data.wind) {
            showDataStatus = false;
            showData(`There is no data for this city: <b>${city}</b> :(( please try again xd`);
        } else {
            showDataStatus = true;
            showData();
            weatherData.data = data;
            weatherData.city = city;
            updateWeather(data, city);
        }

    }
    catch {
        console.log('error: ', e);
        showDataStatus = false;
        showData();
    }
}

function updateWeather(fetchedData, city) {
    let data = fetchedData;

    if (!celsius) {
        day0UItemp.innerHTML = convertToF(data.forecast[0].temperature);
        day1UItemp.innerHTML = convertToF(data.forecast[1].temperature);
        day2UItemp.innerHTML = convertToF(data.forecast[2].temperature);
        tempUI.innerHTML = convertToF(data.temperature);
    } else {
        day0UItemp.innerHTML = removePlusSign(data.forecast[0].temperature);
        day1UItemp.innerHTML = removePlusSign(data.forecast[1].temperature);
        day2UItemp.innerHTML = removePlusSign(data.forecast[2].temperature);
        tempUI.innerHTML = removePlusSign(data.temperature);
    }

    weatherUI.innerHTML = city;
    windUI.innerHTML = data.wind;
    descriptionUI.innerHTML = `<img class="weather__now__icon"
    src=${weatherIcon(data.description)}
    alt="${data.description}">`;

    day0UIwind.innerHTML = data.forecast[0].wind;
    day1UIwind.innerHTML = data.forecast[1].wind;
    day2UIwind.innerHTML = data.forecast[2].wind;

    // returns named week day [ friday, sunday...]
    let date = new Date();
    weekDay0UI.innerHTML = days[date.getDay()]
    weekDay1UI.innerHTML = getWeekDay(days[date.getDay() + 1], 1);
    weekDay2UI.innerHTML = getWeekDay(days[date.getDay() + 2], 2);
}

function showData(msg) {
    if (showDataStatus) {
        weatherDataUI.style.display = "block";
        weathererrorUI.style.display = "none";
    } else {
        weatherDataUI.style.display = "none";
        weathererrorUI.style.display = "block";
        weathererrorUI.innerHTML = `<div>${msg}</div>`
    }
}

function convertToF(num) {
    let toNum = parseInt(num);
    if (isNaN(toNum)) {
        return '\xB0F.';
    } else {
        return Math.floor(toNum * 9 / 5 + 32) + ' \xB0F.';
    }

}

function removePlusSign(num) {
    if (num[0] === "+") {
        return num.slice(1);
    }
    return num
}

function weatherIcon(weatherDescr) {
    switch (weatherDescr.toLowerCase()) {
        case 'light drizzle, mist':
            return "img/mist.png"
        case 'sunny':
            return "img/sunny.png"
        case 'partly cloudy':
            return "img/partly-cloudy.png"
        case 'snow':
            return "img/snow.png"
        case 'light rain, rain shower':
            return "img/rainy.png"
        case 'rain shower':
            return "img/rainy.png"
        case 'light rain':
            return "img/rainy.png"
        default:
            console.log(`Not found weather icon`);
    }

}

function getWeekDay(today, dayNum) {
    if (!today) {
        if (dayNum === 1) return days[0]
        if (dayNum === 2) return days[1]
    }
    return today
}


getWeather();