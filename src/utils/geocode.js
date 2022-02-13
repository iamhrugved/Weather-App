const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaHJ1Z3ZlZHBhd2FyIiwiYSI6ImNremJsaThqbDJmajcycG16c290c3Rpd3YifQ.weO0u4lOZN4C9himyxNb-w"
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback({error: 'Unable to find location'}, undefined)
        } else {
            callback (undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode