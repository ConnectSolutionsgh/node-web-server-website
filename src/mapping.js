const request=require('./utlils/geocode')
const getLocation='kofridua'

geocode(getLocation,(error,data)=>{
console.log(data)
})