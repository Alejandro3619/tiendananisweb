var id_Regis=getParameter('user')

function getParameter(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

console.log(localStorage.getItem(id_Regis))
console.log(JSON.parse(localStorage.getItem(id_Regis)))

document.getElementById("NombreProducto").value=JSON.parse(localStorage.getItem(id_Regis)).NombreProducto
document.getElementById('Precio').value=JSON.parse(localStorage.getItem(id_Regis)).Precio
document.getElementById('Cantidad').value=JSON.parse(localStorage.getItem(id_Regis)).Cantidad
document.getElementById('Referencia').value=JSON.parse(localStorage.getItem(id_Regis)).Referencia


function Actualizar(){
    var datos={
        "NombreProducto":document.getElementById('NombreProducto').value,
        "Precio":document.getElementById('Precio').value,
        "Cantidad":document.getElementById('Cantidad').value,
        "Referencia":document.getElementById('Referencia').value
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/UpdateProducto",
        data:datos,//tare los datos de arriba
        datatype:"json",
        success:function(data){
            if(data.save==1){
                alert('Producto Modificado')
                console.log('Producto Modificado')
                location.href='/Producto'
            }else{
                alert('NO Modificado')
                console.log('NO Modificado')
            }
        }
    })
}