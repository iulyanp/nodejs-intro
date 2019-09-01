const request = require('request')

const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
    + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoiaXVseWFucG9wYSIsImEiOiJjanZlMmgxaWsxcTBpNDZtbW9yN2F4YWU1In0.vTUm64jAaplaUgtqlm3cgQ&limit=1'

    request({ url: mapboxUrl, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapbox.', undefined)
            return
        }

        if (body.features.length == 0) {
            callback('Unable to find the coordinates for this location.', undefined)
            return
        }

        const pin = body.features[0]
        
        callback(undefined, {
            longitude: pin.center[0],
            latitude:pin.center[1],
            location: pin.place_name
        })
    })
}

module.exports = geocode