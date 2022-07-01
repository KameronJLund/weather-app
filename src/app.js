const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

console.log(__dirname)

const app = express()

const port = process.env.PORT || 3000

const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kameron Lund'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kameron Lund'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'try again',
        title: 'Help',
        name: 'Kameron Lund'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must search for an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error || !location) {
            res.send({ error })
            return console.log(error)
        }

        forecast(latitude, longitude, (error, { description, temperature, feelslike, humidity } = {}) => {
            if (error) {
                res.send({ error })
                return console.log(error)
            }

            res.send({
                latitude,
                longitude,
                location,
                description,
                temperature,
                feelslike,
                humidity
            })

            console.log('The weather in ' + location + ' is ' + description +
                ' at ' + temperature + ' degrees F, \nbut it feels like ' + feelslike + ' degrees F')
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help article not found',
        name: 'Kameron Lund'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        name: 'Kameron Lund'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})