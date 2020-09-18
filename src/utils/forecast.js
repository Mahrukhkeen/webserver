const request=require('request')

const forecasting=(Long,Lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=4b74c8efe9b982f8473978c799257699&query='+Long+','+Lat
    request({url:url, json:true},(error,{body})=>{
        if(error){
            callback('Error in connecting to Weather Stack',undefined)
        }
        else if(body.error){
            callback('Error in Longitude, Latitude',undefined)
        }
        else{
            callback(undefined,body.current)
        }
    })
}

module.exports=forecasting