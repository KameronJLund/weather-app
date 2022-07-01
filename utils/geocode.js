const request = require('postman-request')

const geocode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia' +
        '2FtZXJvbi1sdW5kIiwiYSI6ImNsNTE0OGhvdzAxYTQzY3FxbzV4cjIyaHcifQ' +
        '.fcgzuwH_bI73FltJ_106Lw&limit=1'

    request({ url: mapBoxUrl, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('unable to get location', undefined)
        }
        else {
            const { center, place_name: location } = response.body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }
    })
}

module.exports = geocode