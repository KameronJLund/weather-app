const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const weatherStackUrl = 'http://api.weatherstack.com/current?' +
        'access_key=97f75056040e72ca7cf898c9bf5fa5dd&units=f&query=' +
        latitude + ',' + longitude

    request({ url: weatherStackUrl, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather services', undefined)
        }
        else if (response.body.error) {
            callback('unable to process coordinates', undefined)
        }
        else {
            const { temperature, feelslike,
                weather_descriptions: descriptions,
                humidity } = response.body.current
            callback(undefined, {
                temperature,
                feelslike,
                description: descriptions[0],
                humidity
            })
        }
    })

}

module.exports = forecast