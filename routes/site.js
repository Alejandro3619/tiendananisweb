const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/Login",(req,res)=>{
    res.render("index")
})

router.get("/Proveedor",(req,res)=>{
    res.render("Proveedor")
})

router.get("/Home",(req,res)=>{
    res.render("Home")
})

router.get("/Cliente",(req,res)=>{
    res.render("Cliente")
})

router.get("/Producto",(req,res)=>{
    res.render("Producto")
})

router.get("/ModificarProveedor",(req,res)=>{
    res.render("ModificarProveedor")
})

router.get("/Factura",(req,res)=>{
    res.render("Factura")
})



module.exports=router