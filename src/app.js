const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
     res.render('index', {
         title: 'Weather',
         name: 'Camilo I.'
     })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Camilo Ibanez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For source code please go to https://github.com/camiloibanez/node-weather-website.',
        title: 'Help',
        name: 'Camilo I.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                icon: forecastData.icon,
                forecast: forecastData.forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/weather/myLocation', (req, res) => {
    let latitude = req.query.lat
    let longitude = req.query.long

    forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
            return res.send({
                error
            })
        }
        
        res.send({
            icon: forecastData.icon,
            forecast: forecastData.forecast
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Camilo I.',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Camilo I.',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})