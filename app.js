const express=require('express')
const path=require('path')
let cors=require('cors')
const rutas=require('./routes/site')
const app=express()

app.set('port',3001)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use('/',rutas)
app.use(cors())
app.use(express.static(path.join(__dirname,'Public')))

app.listen(app.get('port'),()=>{
    console.log("WEB en puerto -- ",app.get('port'))
    console.log(__dirname)
})