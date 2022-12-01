const express=require('express')
const router=express.Router()
const bodyParser=require('body-parser')
const connection=require('./connection')
const urlcodeParser=bodyParser.urlencoded({extended:false})
const app=express()

//app.use(bodyParser.json())

router.get("/",function(req,res){
    res.send("Mensaje: Api con Mongo")
})


//****************Proveedor******** */


router.post("/Insertar_Proveedor",urlcodeParser,async(req,res,err)=>{
    
    var obj={
        NombreProveedor:req.body.NombreProveedor,
        Telefono:req.body.Telefono,
        Empresa:req.body.Empresa,
        Direccion:req.body.Direccion
    }
    console.log(obj)
    const db=await connection()
    await db.collection('Proveedor').insertOne(obj,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.status(200).send({save:1})
            if(res.status(200)){
                console.log('Proveedor Insertado')
            }
        }
    })
})
router.post("/DeleteProveedor",urlcodeParser,async(req,res)=>{
    let objBuscar={
        NombreProveedor:req.body.NombreProveedor
    }
    console.log(objBuscar)
    const db=await connection()
    await db.collection('Proveedor').deleteOne(objBuscar,function(err,result){
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
router.post("/MostrarProveedor",urlcodeParser,async(req,res)=>{
    const db=await connection()
    await db.collection('Proveedor').find().toArray(function(err,result){
        if(err){
            res.send(err)
        }
        console.log(result)
        res.status(200).send({result})
    })
})
router.post("/UpdateProveedor",urlcodeParser,async(req,res)=>{
    let objBuscar={
        NombreProveedor:req.body.NombreProveedor
    }
    let cambio={
        $set:{
            NombreProveedor:req.body.NombreProveedor,
            Telefono:req.body.Telefono,
            Empresa:req.body.Empresa,
            Direccion:req.body.Direccion
        }
    }
    console.log(objBuscar)
    console.log(cambio)
    const db=await connection()
    await db.collection('Proveedor').updateOne(objBuscar,cambio,function(err){
        if(err)throw err
        if(err){
            err.send(err)
        }else{
            res.status(200).send({save:1})
            console.log("Actializacion Correcta")
        }
    })
})


//****************Login******** */


router.post("/Login",urlcodeParser,async(req,res)=>{
    var user={
        Usuario:req.body.Usuario,
        Password:req.body.Password
    }
    console.log(user)
    const db=await connection()
    await db.collection('Usuario').find(user).toArray(function(err,result){
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


//****************Producto******** */


router.post("/Insertar_Producto",urlcodeParser,async(req,res,err)=>{
    
    var obj={
        NombreProducto:req.body.NombreProducto,
        Precio:req.body.Precio,
        Cantidad:req.body.Cantidad,
        Referencia:req.body.Referencia
    }
    console.log(obj)
    const db=await connection()
    await db.collection('Producto').insertOne(obj,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.status(200).send({save:1})
            if(res.status(200)){
                console.log('Producto Insertado')
            }
        }
    })
})
router.post("/DeleteProducto",urlcodeParser,async(req,res)=>{
    let objBuscar={
        NombreProducto:req.body.NombreProducto
    }
    console.log(objBuscar)
    const db=await connection()
    await db.collection('Producto').deleteOne(objBuscar,function(err,result){
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
router.post("/MostrarProducto",urlcodeParser,async(req,res)=>{
    const db=await connection()
    await db.collection('Producto').find().toArray(function(err,result){
        if(err){
            res.send(err)
        }
        console.log(result)
        res.status(200).send({result})
    })
})
router.post("/UpdateProducto",urlcodeParser,async(req,res)=>{
    let objBuscar={
        NombreProducto:req.body.NombreProducto
    }
    let cambio={
        $set:{
            NombreProducto:req.body.NombreProducto,
            Precio:req.body.Precio,
            Cantidad:req.body.Cantidad,
            Referencia:req.body.Referencia
        }
    }
    console.log(objBuscar)
    console.log(cambio)
    const db=await connection()
    await db.collection('Producto').updateOne(objBuscar,cambio,function(err){
        if(err)throw err
        if(err){
            err.send(err)
        }else{
            res.status(200).send({save:1})
            console.log("Actializacion Correcta")
        }
    })
})

//****************Cliente******** */


router.post("/Insertar_Cliente",urlcodeParser,async(req,res,err)=>{
    
    var obj={
        NombreCliente:req.body.NombreCliente,
        Documento:req.body.Documento,
        Telefono:req.body.Telefono
    }
    console.log(obj)
    const db=await connection()
    await db.collection('Cliente').insertOne(obj,function(err,result){
        if(err){
            res.send(err)
        }else{
            res.status(200).send({save:1})
            if(res.status(200)){
                console.log('Cliente Insertado')
            }
        }
    })
})
router.post("/DeleteCliente",urlcodeParser,async(req,res)=>{
    let objBuscar={
        NombreCliente:req.body.NombreCliente
    }
    console.log(objBuscar)
    const db=await connection()
    await db.collection('Cliente').deleteOne(objBuscar,function(err,result){
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
router.post("/MostrarCliente",urlcodeParser,async(req,res)=>{
    const db=await connection()
    await db.collection('Cliente').find().toArray(function(err,result){
        if(err){
            res.send(err)
        }
        console.log(result)
        res.status(200).send({result})
    })
})
router.post("/UpdateCliente",urlcodeParser,async(req,res)=>{
    let objBuscar={
        NombreCliente:req.body.NombreCliente
    }
    let cambio={
        $set:{
            NombreCliente:req.body.NombreCliente,
            Telefono:req.body.Telefono,
            Empresa:req.body.Empresa,
            Direccion:req.body.Direccion
        }
    }
    console.log(objBuscar)
    console.log(cambio)
    const db=await connection()
    await db.collection('Cliente').updateOne(objBuscar,cambio,function(err){
        if(err)throw err
        if(err){
            err.send(err)
        }else{
            res.status(200).send({save:1})
            console.log("Actializacion Correcta")
        }
    })
})

//************************ */









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