const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utlils/geocode')
const forecast =require ('./utlils/forecast')
const app=express()
const port=process.env.PORT||3000



//serve up static resources
const publicDirectory=path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory))


//setting handlebars for templating
app.set('view engine','hbs')
app.set ('views',viewPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
res.render('index',{
    title:'Weather App',
    name:'Kwasi Adabo Boakye',

})
})

app.get ('/help',(req,res)=>{
res.render('help',{
    title:'To Help will suffice',
    name: 'Kwasi Adabo Boakye',
    
})
})

app.get ('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Kwasi Adabo Boakye @ About',
        message:'Adabo created this !',
        
    })
    })

    app.get ('/weather',(req,res)=>{
        if (!req.query.address){
            return res.send({
                error: 'You must provide an address'
            })
          }

          geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if (error){
              return  res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if (error){
                    return res.send({error})
            }
            res.send ({
                forecast:forecastData,
                location,
                address:req.query.address
            })
    })

})
})



      
      
        
    

       

      

        app.get ('/help/*',(req,res)=>{
            res.render('404',{
                title:'404',
                name:'Kwasi Adabo Boakye',
                errorMessage:'Help article NOT found'
            })
        })

        app.get ('*',(req,res)=>{
            res.render('404',{
                title:'404',
                name:'Kwasi Adabo Boakye',
                errorMessage:'Page NOT found'
            })
        })
app.listen(port,()=>{
    console.log('Server running of port '+ port)
})