function Ingresar(){
    let  datos={
        "Usuario":document.getElementById('UserName').value,
        "Password":document.getElementById('Password').value
    }

    console.log(datos)
    $.ajax({
        type:"post",
        url:"http://localhost:3005/Login",
        data:datos,//tare los datos de arriba
        datatype:"json",
        success:function(data){
            if(data.existe==1){
                //alert('Usuario Ingresado')
                console.log('Bienvenido')
                location.href='/Home'
            }else{
                alert('Revise sus Datos');
                console.log('ERROR Acceso')
            }
        }
    })
}