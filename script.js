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

let searchBtn = document.querySelector('.btn--new-city');

searchBtn.addEventListener("click", () => {
    getWeather();
})


async function getWeather() {
    let city = document.querySelector('#city').value;
    const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`, { mode: 'cors' });
    const data = await response.json();
    console.log(data)
    updateWeather(data, city);
}

function updateWeather(data, city) {
    weatherUI.innerHTML = city;
    tempUI.innerHTML = removePlusSign(data.temperature);
    windUI.innerHTML = data.wind;
    descriptionUI.innerHTML = weatherIcon(data.description);

    day0UItemp.innerHTML = removePlusSign(data.forecast[0].temperature);
    day1UItemp.innerHTML = removePlusSign(data.forecast[1].temperature);
    day2UItemp.innerHTML = removePlusSign(data.forecast[2].temperature);

    day0UIwind.innerHTML = data.forecast[0].wind;
    day1UIwind.innerHTML = data.forecast[1].wind;
    day2UIwind.innerHTML = data.forecast[2].wind;

    // returns named week day [ friday, sunday...]
    let date = new Date();
    weekDay0UI.innerHTML = days[date.getDay()]
    weekDay1UI.innerHTML = getWeekDay(days[date.getDay() + 1], 1);
    weekDay2UI.innerHTML = getWeekDay(days[date.getDay() + 2], 2);

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
            console.log('Mist' + weatherDescr);
            break;
        case 'sunny':
            console.log('sunny');
            break;
        case 'partly cloudy':
            console.log('cloudy');
            break;
        case 'snow':
            console.log('snow');
            break;
        default:
            console.log(`Not found`);
    }

}

function getWeekDay(today, dayNum) {
    if (!today) {
        if (dayNum === 1) return days[0]
        if (dayNum === 2) return days[1]
    }
}


getWeather();