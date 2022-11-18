const express=require('express')
const connection=require('./connection')
const indexroutes=require('./index')

const app=express()

app.listen(3005,function(){
    console.log('Api en el puerto 3005')
})

app.use("/",indexroutes)

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
})