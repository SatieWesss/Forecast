const date = new Date();
let getMonth = (date) => {
    let months = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Nov','Dec']

    return months[date.getMonth()]
}
let month = getMonth(date);

let day = new Date().getDay();
let getWeekDay = (arg) => {
    let weekDay = ['Sunday','Monday','Tuesday','Wed','Thursday','Friday','Sat'];
    return function () {
        arg++;
        return weekDay[arg];
    }
}
let seven = getWeekDay(day)

const forecastFoo = (data) => {
    data.list.map(item => {
      if(new Date(item.dt * 1000).getUTCHours() === 15){
          const div = document.createElement('div');
          const h2 = document.createElement('h2');
          const span = document.createElement('span')

          const image = document.createElement('img');
          image.src = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
          const p1 = document.createElement('p');

          const p2 = document.createElement('p');

          const p3 = document.createElement('p');
        
          /////if-ov bolor 7orer@ anvanapoxel
          h2.innerHTML = `${month} ${item.dt_txt.split(' ')[0][8]}${item.dt_txt.split(' ')[0][9]} <br/>${seven()}`;

          div.appendChild(h2);
          div.appendChild(span);

          span.appendChild(image);
          span.appendChild(p1);
          span.appendChild(p2)
          span.appendChild(p3);

          p1.innerHTML = `${Math.ceil(item.main.temp)} &#8451`;
          p2.innerHTML = `${item.main.humidity}%`;
          p3.innerHTML = item.weather[0].description;
          document.getElementById('forecast').appendChild(div);

          div.addEventListener('click', () => {
            
             data.list.forEach(element => {
                 if(h2.innerHTML.split(' ')[1] === element.dt_txt.split('-')[2].split(' ')[0]) {
                    let detailsDiv = document.createElement('div');
                     document.getElementById('details').appendChild(detailsDiv)

                    let details_h2 = document.createElement('h2');
                    details_h2.innerHTML = element.dt_txt.split(' ')[1].slice(0,5);
                    detailsDiv.appendChild(details_h2);

                    let details_image = document.createElement('img');
                    details_image.src = `http://openweathermap.org/img/w/${element.weather[0].icon}.png`
                    detailsDiv.appendChild(details_image);

                    let details_p1 = document.createElement('p');
                    details_p1.innerHTML = `${Math.ceil(element.main.temp)}&#176`
                    detailsDiv.appendChild(details_p1);

                    
                    let details_p2 = document.createElement('p');
                    details_p2.innerHTML = `${element.main.humidity}%`; 
                    detailsDiv.appendChild(details_p2);

                    let details_p3 = document.createElement('p');
                    details_p3.innerHTML = element.weather[0].description;
                    detailsDiv.appendChild(details_p3);

                    }
                });
            
            })
        }
    })
}   
const weatherFoo = (data) => {     
    let x = new Date().getDate();
    let y = getMonth(date);
    document.getElementById('today').innerHTML = `${y} ${x} </br> ${seven()}`;
    
    document.getElementById('country').innerHTML = `${data.name}, ${data.sys.country}`

    let weather_icon = document.createElement('img');
    weather_icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.getElementById('temperature').innerHTML = `${Math.ceil(data.main.temp)} &#8451`;
    
    document.getElementById('p1').innerHTML =`${data.main.humidity}%`

    document.getElementById('p2').innerHTML = `${data.weather[0].description}`
}

function main() { 
const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'fd48bdf8a8b87b3c140f17625f4e2d57'; 
const city = document.getElementById('cityName').value;

const url1 = `${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;
const url2 = `${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;
if(city) {
    Promise.all([
    fetch(url1).then(resp => resp.json()),
    fetch(url2).then(resp => resp.json())
])
.then(data => {
    const forecast = data[0];
    const weather = data[1];
   weatherFoo(weather);
   forecastFoo(forecast)

})
.catch(error => alert('Ooops! The city wasn`t found'))
} else {
    alert('Please,enter city name')
}
}

const enter = (event) => {
    if(event.key ===  'Enter') {
        main()
    }
}