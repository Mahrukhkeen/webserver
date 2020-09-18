const path = require('path')

const express=require('express')
const hbs=require('hbs')
const request = require('request')

const geocoding=require('./utils/geocode')
const forecasting=require('./utils/forecast')
const { title } = require('process')

const app=express()
const port = process.env.port || 3000

//path
//const mainPath=path.join(__dirname,'../template/views')
const viewPath=path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')
//console.log(mainPath)

//app.use(express.static(viewPath))
app.use(express.static(path.join(__dirname, '../public')));

//hbs
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//get

app.get('',(req,res)=>{
    res.render('index',{
        content:'Show weather',
        title:'Weather'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        content:'Out and About',
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        content:'Help me :(',
        title:'Help'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({
            error:'Kindly enter the address'
        })
    ////////////////////////////////////////////////////
    const address=req.query.address
    geocoding(address,(error,{latitude,longitude,name}={})=>{
        if(error)
            return res.send(error);
        //console.log('Data',latitude,longitude)
        forecasting(longitude,latitude,(error,data)=>{
        if(error)
            return res.send(error);
           // console.log('Name : ',name)
            //console.log(data)
            res.send({
                location : name,
                temperature:data.temperature,
                feelsLike:data.weather_descriptions[0]
            }) 
        })
    })
    //////////////////////////////////////////////////////
    
})

app.get('*', (req,res)=>{
    res.render('error',{
        content:'Error - 404'
    })
})



app.listen(port,()=>{
    console.log("Server is up on port "+port)
})