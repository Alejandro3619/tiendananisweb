const express=require('express')
const router=express.Router()
const bodyParser=require('body-parser')
const connection=require('./connection')
const urlcodeParser=bodyParser.urlencoded({extended:false})
const app=express()

app.use(bodyParser.json())

router.get("/",function(req,res){
    res.send("Mensaje: Api con Mongo")
})


router.post("/Insertar_User",urlcodeParser,async(req,res,err)=>{
    
    var obj={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        usuario:req.body.usuario,
        password:req.body.password,
        profesion:req.body.profesion,
        estado:parseInt(req.body.estado)
    }
    console.log(obj)
    const db=await connection()
    await db.collection('Profile').insertOne(obj,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.status(200).send({save:1})
            if(res.status(200)){
                console.log('Usuario Insertado')
            }
        }
    })
})


router.post("/Mostrar",urlcodeParser,async(req,res)=>{
    const db=await connection()
    await db.collection('Profile').find().toArray(function(err,result){
        if(err){
            res.send(err)
        }
        console.log(result)
        res.status(200).send({result})
    })
})


router.post("/Login",urlcodeParser,async(req,res)=>{
    var user={
        usuario:req.body.usuario,
        password:req.body.password
    }
    console.log(user)
    const db=await connection()
    await db.collection('Profile').find(user).toArray(function(err,result){
        if(err){
            res.send(err)
        }else{
            if(result.length>0){
                res.status(200).send({existe:1,userId:result[0]._id})
                console.log(result[0]._id)
                console.log(result)
            }else{
                res.status(200).send({existe:0})
            }
        }
    })
})


router.post("/ShowUser",urlcodeParser,async(req,res)=>{
    let busqueda={
        profesion:req.body.profesion
    }
    console.log(busqueda)
    const db=await connection()
    await db.collection('Profile').find(busqueda).toArray(function(err,result){
        if(err){
            err.send(err)
        }else{
            res.status(200).send({result})
            console.log(result)
        }
    })
})


router.post("/UpdateUsuario",urlcodeParser,async(req,res)=>{
    let objBuscar={
        usuario:req.body.usuario
    }
    let cambio={
        $set:{//profesion:req.body.profesion
            estado:parseInt(req.body.estado)}
    }
    console.log(objBuscar)
    console.log(cambio)
    const db=await connection()
    await db.collection('Profile').updateOne(objBuscar,cambio,function(err){
        if(err)throw err
        if(err){
            err.send(err)
        }else{
            res.status(200).send({save:1})
            console.log("Actializacion Correcta")
        }
    })
})


router.post("/DeleteUsuario",urlcodeParser,async(req,res)=>{
    let objBuscar={
        usuario:req.body.usuario
    }
    console.log(objBuscar)
    const db=await connection()
    await db.collection('Profile').deleteOne(objBuscar,function(err,result){
        if(err)throw err
        if(err){
            res.send({eliminado:0})
        }else{
            if(res.status(200)){
                res.status(200).send({eliminado:1, msn:"Document Eliminate"})
                console.log("Eliminado Correctamente")
            } 
        }
    })
})


router.post("/ProfileEstadoJoin",urlcodeParser,async(req,res)=>{
    /*   ****OTRA MANERA DE HACER LA CONSULTA
    const db=await connection()
    await db.collection('Profile').aggregate([{
        $lookup:{from:'Estado', localField:'EstadoID', foreignField:'_id', as:"DescripEstado"}
    }]).toArray(function(err,result){
        if(err){
            err.send(err)
        }else{
            res.status(200).send({save:1})
            console.log(result)
        }
    })
    */
    let consulta=[{
        $lookup:{from:'Estado', localField:'estado', foreignField:'_id', as:"DescripEstado"}
    }]
    console.log(consulta)
    const db=await connection()
    await db.collection('Profile').aggregate(consulta).toArray(function(err,result){
        if(err){
            res.send(err)
        }else{
            res.status(200).send({result})
            console.log(result)
        }
    })
})


router.post("/ProfileEstadoJoin2",urlcodeParser,async(req,res)=>{
    let consulta=[{
        $lookup:{from:'Estado', localField:'estado', foreignField:'_id', as:"DescripEstado"}
    },{
        $project:{nombre:1,usuario:1,DescripEstado:{Descripcion:1}}
    }]
    console.log(consulta)
    const db=await connection()
    await db.collection('Profile').aggregate(consulta).toArray(function(err,result){
        if(err){
            res.send(err)
        }else{
            res.status(200).send({result})
            console.log(result)
        }
    })
})


module.exports=router


/*


http://localhost:3005/Insertar_User

{
    "nombre":"Alejo",
    "apellido":"Galviz",
    "usuario":"Usuario1",
    "password":123,
    "profesion":"Programador"
}
*/