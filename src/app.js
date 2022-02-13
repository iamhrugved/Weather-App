const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Hrugved Pawar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Hrugved Pawar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Hrugved Pawar',
        helpText: 'This is the help page'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({error: 'Please enter the address.'})
    }
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send(error);
            }
            forecast(latitude, longitude, (error, {forecast}) => {
                if (error) {
                    return res.send(error);
                }
                res.send({
                    location: location,
                    forecast: forecast,
                    address: address
                });
            });
        })

    })


app.get('/help/*', (req, res) => {
    res.render('404page', {
        message: 'Help article not found',
        title: '404',
        name: 'Hrugved Pawar'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        message: 'Page not found',
        title: '404',
        name: 'Hrugved Pawar'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})