const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()

// console.log(__dirname)
// console.log(path.join(__dirname));

//defining paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') //setup handlebars engine
app.set('views', viewsPath) //this line is to customize the views folder name (templates here).. as it was views it was known by default, on changing its name to templates it was not automatically rendered
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory)); //setup static directory to server

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'sth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        helpText : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        name : 'sth'
    })
})

app.get('/help/*', (req,res) => { //404Page
    res.render('error', {
        title : '404 ERROR',
        errorMessage : 'Help article is not found',
        name : 'sth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About app',
        name : 'sth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    // Setting a default value for latitude, longitude, location as empty so as if it was not sent the code still runs even with empty strings
    // But if it wasn't set by a default parameter, it will never run it will just return error for not calling with parameters

        if(error){       //Making return in the condition in order not to move to the next step of the forecast in case of error
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                forecast : forecastData,
                location, //shorted as the value has the same name as the property
                address : req.query.address
            })
        })
    })
})

app.get('*', (req,res) => { //404Page
    res.render('error', {
        title : '404 ERROR',
        errorMessage : 'This page is not found',
        name : 'sth'
    })
})

app.listen(3000, () => {
    console.log("Server is up");
    
})