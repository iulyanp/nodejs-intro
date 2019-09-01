const request = require('request')

const weather = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bacbbbcb0d998ef5afc6ae4642e27bc9/37.8267,-122.4233?units=si'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)

            return;
        }

        if (body.error) {
            callback('Unable to find location!', undefined)

            return
        }

        const currently = body.currently
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + 
        currently.temperature + '°C degrees out. There is a ' + currently.precipProbability + '% chance to rain.')
    })
}

module.exports = weather