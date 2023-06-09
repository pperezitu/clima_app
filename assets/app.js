const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');
const countryValue = 'CL';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(nameCity.value === '') {
        showError('Obligatorio');
    }

    callAPI(nameCity.value);
    // console.log(nameCity.value);
    // console.log(nameCountry.value);
})

const callAPI = (city) => {
    const apiId = '34e12b4e89cd8ed4f74299235f794787';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryValue}&appid=${apiId}`;

    fetch(url).then(data =>{
        return data.json();
    }).then(dataJSON => {
        dataJSON.cod === '404' ? 
            showError('Ciudad no encontrada...') : clearHTML(), showWeather(dataJSON);
        console.log(dataJSON);
    }).catch(error => {
        console.log(error);
    })
}

const showWeather = (data) => {
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const content = document.createElement('div');

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@4x.png" alt="icon" />
        <h2>Temperatura actual ${degrees}°C</h2>
        <p>minina ${min}°C</p>
        <p>maxima ${max}°C</p>
    `;

    result.appendChild(content);

    // console.log(name);
    // console.log(temp);
    // console.log(temp_min);
    // console.log(temp_max);
    // console.log(arr.icon);
}

const showError = (message) => {
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

const kelvinToCentigrade = (temp) => {
    return parseInt(temp - 273.15);
}

const clearHTML = () => {
    result.innerHTML = '';
}