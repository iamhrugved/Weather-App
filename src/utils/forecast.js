const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=02780f4ed07b1053a6ad652c274c3bdb&query='+latitude+','+longitude+'&units=f'
    request ({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to servers', undefined)
        } else if (body.error) {
            callback('Invalid coordinates', undefined)
        } else {
            callback (undefined, {
            forecast: body.current.weather_descriptions[0] + ' - The current temperature is ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.'
            })
        }
    })
}

module.exports = forecast