const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')


const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlbars engine and views location
app.set('views', viewsDir)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        body: 'Use this to get the forecast:'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        body: 'This is the help page',
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        body: 'Created by Iulian',
    })
})

app.get('/about', (request, response) => {
    response.send('Hello about')
})

app.get('/weather', (request, response) => {
    const address = request.query.address

    if (!address) {
        return response.send({
            'error': 'You have to specify an address.'
        })
    }
    
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return response.send({ 'error': error })
        }

        weather(longitude, latitude, (error, forecast) => {
            if (error) {
                return response.send({ 'error': error })
            }

            response.send({
                forecast: forecast,
                location,
                address
            })
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        body: "Oops, The Page you are looking for can't be found!"
    })
})
app.listen(4000, () => {
    console.log('Server is up on port 4000')
})