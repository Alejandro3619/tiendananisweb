function Insertar(){
    var datos={
        "NombreCliente":document.getElementById('NombreCliente').value,
        "Documento":document.getElementById('Documento').value,
        "Telefono":document.getElementById('Telefono').value
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/Insertar_Cliente",
        data:datos,//tare los datos de arriba
        datatype:"json",
        success:function(data){
            if(data.save==1){
                alert('Cliente Ingresado')
                console.log('Cliente Ingresado')
                location.href='/Cliente'
            }else{
                alert('NO Ingresado')
                console.log('NO Ingresado')
            }
        }
    })
}


function Eliminar(username){
    let datos={
        'NombreCliente':username
    }
    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/DeleteCliente",
        data:datos,//tare los datos de arriba
        dataType:"json",
        success:function(data){
            if(data.eliminado==1){
                alert('Cliente Eliminado')
                console.log('Cliente Eliminado')
                location.href='/Cliente'
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
    url:"http://localhost:3005/MostrarCliente",
    data:datosTabla,//tare los datos de arriba
    datatype:"json",
    success:function(data){
        let user_array=[]

        if(data.result.length>0){
            for(i=0;i<data.result.length;i++){
                let user=''.concat("'",data.result[i].NombreCliente,"'")
                console.log(user)

                $('#games').append('<tr>')
                $('#games').append('<td>'+data.result[i]._id+'</td>')
                $('#games').append('<td>'+data.result[i].NombreCliente+'</td>')
                $('#games').append('<td>'+data.result[i].Documento+'</td>')
                $('#games').append('<td>'+data.result[i].Telefono+'</td>')
                $('#games').append('<td> <button class="btn btn-danger" onclick="Eliminar('+user+')"><i class="bi bi-eraser"></i>Eliminar</button><button class="btn btn-succes" onclick="Actualizar('+user+')"><i class="bi bi-eraser"></i>Modificar</button></td>')
                $('#games').append('</tr>')
            }
        }else{
            alert('Sin Registro')
            console.log('Sin Registro Tabla')
        }
    }
})