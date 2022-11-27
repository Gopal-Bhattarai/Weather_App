const path = require('path');
const express = require('express');
const hbs = require('hbs')

//getting geo files
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for Express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Gopal Bhattarai'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Gopal Bhattarai'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Gopal Bhattarai'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.city;
    if(!address) {
        return res.send({
            error: 'You must provide a city name'
        })
    } 
    // res.send({
    //     location: address
    // })

    geocode(address,(error,{Latitude,Longitude, City, Zone, Country}={}) => {
        forecast(Latitude, Longitude,(error,forecastData) => {
        //forecast(27.7172, 85.3240,(error,forecastData) => { 
            const geo = ('GeoLocation: ', City, Zone, Country);
            const fcast =  ('Forecast: ',forecastData);

            //finally sending back data to browser
            res.send({
                forecast: fcast,
                location: geo
            })
        })
        })




})


app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'HELP NOT FOUND',
        name: 'Gopal Bhattarai'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'FILE NOT FOUND',
        name: 'Gopal Bhattarai'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
})