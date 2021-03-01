const request= require('request')
//const getLocation='kofridua'
const geocode=(address,callback)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRhYm8iLCJhIjoiY2tsM3l4b3FkMDlhczMwcDZna3kwMWU1ZiJ9.-irVfabamlpglGUwZo-VTQ&limit=1'
    request({url:url,json:true},(error,response)=>{
      if (error){
          callback('Unable to connect to server',undefined);
      }else if(response.body.features.length===0){
         callback('unable to find location. Try another search',undefined)
      }else{
            callback(undefined,{
                 latitude : response.body.features[0].center[1],
                 longitude:response.body.features[0].center[0],
                 location:response.body.features[0].place_name
            })

      }
    });
}

/*const getLocation='houston'
geocode(getLocation,(error,data)=>{
console.log(data)
})*/

module.exports=geocode;