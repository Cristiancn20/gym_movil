<?php
require_once('ConexionCls.php');
$Conn = new Cls_Conexion();
header("Content-type:application/json;charset=utf-8");
$ReceiveData = json_decode(file_get_contents("php://input"), true);
$Email = $ReceiveData['EmailSend'];
$Password = $ReceiveData['PasswordSend'];

// $Email = "alvarorobles10@gmail.com";
// $Password = "A_RsP135%e#s";

$Ruta = null;
$Response = array();

//Search ruta
$SearchRute = "SELECT * FROM tbl_imgussers WHERE email= '$Email'";
$Configsearch = mysqli_query($Conn->Conect(), $SearchRute);

if (mysqli_num_rows($Configsearch) > 0) {  //Hay datos
    $SearchArray = mysqli_fetch_row($Configsearch);
    $Ruta = $SearchArray[2];
}

//Search Keys
$GetData = "SELECT * FROM users WHERE email= '$Email'";
$Config = mysqli_query($Conn->Conect(), $GetData);
$Datos  = array();

if (mysqli_num_rows($Config) > 0) {

    while ($row = $Config->fetch_array(MYSQLI_ASSOC)) {
        $Datos[] = $row;
        array_push($Datos, ['ruta' => $Ruta]);
        array_push($Datos, ['Code' => 1]);
        if (password_verify($Password, $row['password'])) {
            echo json_encode($Datos, JSON_UNESCAPED_UNICODE);
        } else {
            $Response["Code"] = -1;
            $Response["Messaje"] = "Error, los datos son incorrectos.";
            echo json_encode($Response);
        }
    }
} else {
    $Response["Code"] = 0;
    $Response["Messaje"] = "No existe ninguna cuenta asociada a este email.";
    echo json_encode($Response);
}
