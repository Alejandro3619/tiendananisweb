var id_Regis=getParameter('user')

function getParameter(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

console.log(localStorage.getItem(id_Regis))
console.log(JSON.parse(localStorage.getItem(id_Regis)))

document.getElementById("NombreProveedor").value=JSON.parse(localStorage.getItem(id_Regis)).NombreProveedor
document.getElementById('Telefono').value=JSON.parse(localStorage.getItem(id_Regis)).Telefono
document.getElementById('Empresa').value=JSON.parse(localStorage.getItem(id_Regis)).Empresa
document.getElementById('Direccion').value=JSON.parse(localStorage.getItem(id_Regis)).Direccion


function Actualizar(){
    var datos={
        "NombreProveedor":document.getElementById('NombreProveedor').value,
        "Telefono":document.getElementById('Telefono').value,
        "Empresa":document.getElementById('Empresa').value,
        "Direccion":document.getElementById('Direccion').value
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/UpdateProveedor",
        data:datos,//tare los datos de arriba
        datatype:"json",
        success:function(data){
            if(data.save==1){
                alert('Proveedor Modificado')
                console.log('Proveedor Modificado')
                location.href='/Proveedor'
            }else{
                alert('NO Modificado')
                console.log('NO Modificado')
            }
        }
    })
}