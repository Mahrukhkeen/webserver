const request=require('request')

const geocoding=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFocnVraGtlZW4iLCJhIjoiY2tleDl6eHd4MDA1aDJ4cXRpdG8yaDZlNyJ9.8WrBPBcH3-1RzruPs8N6ww&limit=1'
    request({url:url, json:true},(error,{body})=>{
        if(error)
        {
            callback('Error in connecting mapbox',undefined)
        }
        else if(body.message || body.features.length==0){
            callback('Error in finding location',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                name:body.features[0].place_name
            })
        }
    })
}

module.exports=geocoding;