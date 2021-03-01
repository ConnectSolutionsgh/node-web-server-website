const request= require('request')
const forecast=(latitude,longitude,callback)=>{
    url='http://api.weatherstack.com/current?access_key=f56939b20896b43b88b6fdc8a2f809d8&query='+ latitude +','+longitude 
    request({url:url,json:true},(error,response)=>{
      if (error){
          callback('Unable to connect to service',undefined)
      }else if(response.body.error){
         callback('unable to find location. Try another search',undefined)
      }else{
            callback(undefined, response.body.current.weather_descriptions[0]+'. it is currently '+response.body.current.temperature +' degrees out. there is a '+ response.body.current.precip +'% chance of rain')
    }
    });
}

/*const getLocation='Accra'
forecast(getLocation,(error,data)=>{
console.log(data)
})*/
module.exports=forecast;