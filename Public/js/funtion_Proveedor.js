
function Insertar(){
    var datos={
        "NombreProveedor":document.getElementById('NombreProveedor').value,
        "Telefono":document.getElementById('Telefono').value,
        "Empresa":document.getElementById('Empresa').value,
        "Direccion":document.getElementById('Direccion').value
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/Insertar_Proveedor",
        data:datos,//tare los datos de arriba
        datatype:"json",
        success:function(data){
            if(data.save==1){
                alert('Proveedor Ingresado')
                console.log('Proveedor Ingresado')
                location.href='/Proveedor'
            }else{
                alert('NO Ingresado')
                console.log('NO Ingresado')
            }
        }
    })
}


function Eliminar(username){
    let datos={
        'NombreProveedor':username
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/DeleteProveedor",
        data:datos,//tare los datos de arriba
        dataType:"json",
        success:function(data){
            if(data.eliminado==1){
                alert('Proveedor Eliminado')
                console.log('Proveedor Eliminado')
                location.href='/Proveedor'
            }else{
                alert('NO Eliminado')
                console.log('NO Eliminado')
            }
        }
    })
}


var datosTabla={}
console.log(datosTabla)

$.ajax({
    type:"post",
    url:"http://localhost:3005/MostrarProveedor",
    data:datosTabla,//tare los datos de arriba
    datatype:"json",
    success:function(data){
        let user_array=[]

        if(data.result.length>0){
            for(i=0;i<data.result.length;i++){
                let user=''.concat("'",data.result[i].NombreProveedor,"'")

                let Objetomostrar={
                    'NombreProveedor':data.result[i].NombreProveedor,
                    'Telefono':data.result[i].Telefono,
                    'Empresa':data.result[i].Empresa,
                    'Direccion':data.result[i].Direccion
                }
                user_array.push(Objetomostrar)
                localStorage.setItem(user,JSON.stringify(Objetomostrar))
                
                //console.log(user)
                //console.log(Objetomostrar)

                $('#games').append('<tr>')
                $('#games').append('<td>'+data.result[i]._id+'</td>')
                $('#games').append('<td>'+data.result[i].NombreProveedor+'</td>')
                $('#games').append('<td>'+data.result[i].Telefono+'</td>')
                $('#games').append('<td>'+data.result[i].Empresa+'</td>')
                $('#games').append('<td>'+data.result[i].Direccion+'</td>')
                $('#games').append('<td> <button class="btn btn-danger" onclick="Eliminar('+user+')"><i class="bi bi-eraser"></i>Eliminar</button><button class="btn btn-succes" onclick="Actualizar('+user+')"><i class="bi bi-eraser"></i>Modificar</button></td>')
                $('#games').append('</tr>')
            }
            console.log(user_array)
            console.log(localStorage.getItem("Silvestre"))
    
        }else{
            alert('Sin Registro')
            console.log('Sin Registro Tabla')
        }
        }
})

function Actualizar(username){
    console.log(username)
    location.href='/ModificarProveedor?user='+username
}
