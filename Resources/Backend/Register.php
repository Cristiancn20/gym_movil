<?php

require_once('ConexionCls.php');
$Conn = new Cls_Conexion();
header("Content-type:application/json;charset=utf-8");
$ReceiveData = json_decode(file_get_contents("php://input"), true);

//Data receive
$Name = $ReceiveData['FName'];
$Ussername = $ReceiveData['FUssername'];
$Email = $ReceiveData['FEmail'];
$Password = $ReceiveData['FPassword'];
$passwordbyencript = password_hash($Password, PASSWORD_BCRYPT);

$Response = array();

//Consult exist email
$SearchEmail = "SELECT email FROM users WHERE email = '$Email'";
$Search = mysqli_query($Conn->Conect(), $SearchEmail);

if (mysqli_num_rows($Search) > 0) { //Correo Existente
    $Response["Code"] = 0;
    $Response["Messaje"] = "El correo ingresado ya existe";
} else {
    $SetNewUsser = "INSERT INTO users (name, Username, email, password, role) VALUES ('$Name', '$Ussername', '$Email','$passwordbyencript', '1')";
    $Config = mysqli_query($Conn->Conect(), $SetNewUsser);
    if ($SetNewUsser) { //Registro correcto
        $Response["Code"] = 1;
        $Response["Messaje"] = "Registrado correctamente";
    } else { //registro incorrecto
        $Response["Code"] = -1;
        $Response["Messaje"] = "Hubo un error, intentelo de nuevo más tarde";
    }
}
echo  json_encode($Response);
