'use strict'

async function getCoordinates(city){
    const encodedCity = encodeURIComponent(city)
    return fetch(`https://nominatim.openstreetmap.org/search?q=${encodedCity}&format=json&limit=1`,
        {
        headers: {
            'User-Agent': 'MyWeatherApp/1.0'
        }
    })
        .then(res => res.json())
        .then(data => {
            const {lat, lon} = data[0];
            return {lat: +lat, lon: +lon};
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

async function getWeather(city){
    const coordinates = await getCoordinates(city);
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
            const {current_weather} = data
            return current_weather
        })
        .catch(err => {
            console.log(err)
            throw err
        })

}

const city = prompt('What is your city?')
const weather  = await getWeather(city)
alert(`${weather.temperature}°C в городе ${city}`)


