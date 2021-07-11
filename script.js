const API_KEY = '3265874a2c77ae4a04bb96236a642d2f';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const url = location => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
}

async function getWeatherByLocation(location) {
  const resp = await fetch(url(location), {origin: 'cors'});
  const respData = await resp.json();

  // test
  console.log(respData);
  
  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  main.innerHTML = '';

  const temp = kelToCel(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />  
      ${temp}°C
    </h2>
    <small>${data.name}</small>
  `;

  main.appendChild(weather);
}

// convert Kelvin to Celcius
function kelToCel(kelvin) {
  return Math.floor(kelvin - 273.15);
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const location = search.value;
  if(location) {
    getWeatherByLocation(location);
  }

  search.value = '';
});