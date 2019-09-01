const yargs = require('yargs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

yargs.command({
    command: 'in',
    describe: 'Location forecasts',
    builder: {
        location: {
            describe: 'Location',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const location = argv.location
        
        geocode(location, (error, { longitude, latitude, location }) => {
            if (error) {
                return console.log(error)
            }

            weather(longitude, latitude, (error, forecast) => {
                if (error) {
                    return console.log(error)
                }

                console.log(location)
                console.log(forecast)
            })
        })
    }
});

yargs.parse()
