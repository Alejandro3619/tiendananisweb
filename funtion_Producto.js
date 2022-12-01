function Insertar(){
    var datos={
        "NombreProducto":document.getElementById('NombreProducto').value,
        "Precio":document.getElementById('Precio').value,
        "Cantidad":document.getElementById('Cantidad').value,
        "Referencia":document.getElementById('Referencia').value
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/Insertar_Producto",
        data:datos,//tare los datos de arriba
        datatype:"json",
        success:function(data){
            if(data.save==1){
                alert('Producto Ingresado')
                console.log('Producto Ingresado')
                location.href='/Producto'
            }else{
                alert('NO Ingresado')
                console.log('NO Ingresado')
            }
        }
    })
}


function Eliminar(username){
    let datos={
        'NombreProducto':username
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/DeleteProducto",
        data:datos,//tare los datos de arriba
        dataType:"json",
        success:function(data){
            if(data.eliminado==1){
                alert('Producto Eliminado')
                console.log('Producto Eliminado')
                location.href='/Producto'
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
    url:"http://localhost:3005/MostrarProducto",
    data:datosTabla,//tare los datos de arriba
    datatype:"json",
    success:function(data){
        let user_array=[]

        if(data.result.length>0){
            for(i=0;i<data.result.length;i++){
                let user=''.concat("'",data.result[i].NombreProducto,"'")
                let userlocal=data.result[i].NombreProducto

                let Objetomostrar={
                    'NombreProducto':data.result[i].NombreProducto,
                    'Precio':data.result[i].Precio,
                    'Cantidad':data.result[i].Cantidad,
                    'Referencia':data.result[i].Referencia
                }
                user_array.push(Objetomostrar)
                localStorage.setItem(userlocal,JSON.stringify(Objetomostrar))
                
                console.log(user)
                console.log(Objetomostrar)

                $('#games').append('<tr>')
                $('#games').append('<td>'+data.result[i]._id+'</td>')
                $('#games').append('<td>'+data.result[i].NombreProducto+'</td>')
                $('#games').append('<td>'+data.result[i].Precio+'</td>')
                $('#games').append('<td>'+data.result[i].Cantidad+'</td>')
                $('#games').append('<td>'+data.result[i].Referencia+'</td>')
                $('#games').append('<td> <button class="btn btn-danger" onclick="Eliminar('+user+')"><i class="bi bi-eraser"></i>Eliminar</button><button class="btn btn-succes" onclick="Actualizar('+user+')"><i class="bi bi-eraser"></i>Modificar</button></td>')
                $('#games').append('</tr>')
            }
            console.log(user_array)
        }else{
            alert('Sin Registro')
            console.log('Sin Registro Tabla')
        }
    }
})


function Actualizar(username){
    console.log(username)
    location.href='/ModificarProducto?user='+username
}
