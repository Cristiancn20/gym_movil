<?php
header("Content-type:application/json;charset=utf-8");
$ReceiveData = json_decode(file_get_contents("php://input"), true);
$Email = $ReceiveData['EmailSend'];
$Type = $ReceiveData['Process'];
$TokenSend = $ReceiveData['TokenSend'];
$NewPassword = $ReceiveData['NewPassword'];
$Token = "";

include('../ConexionCls.php');
include('Dates.php');
include('TemplateEmail.php');

$Conn = new Cls_Conexion();
$Emm = new Cls_Email();
$Datt = new Cls_Dates();


$Response = array();

function GetToken($length)
{
    $key = "";
    $pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
    $max = strlen($pattern) - 1;
    for ($i = 0; $i < $length; $i++) {
        $key .= substr($pattern, mt_rand(0, $max), 1);
    }
    return $key;
}

if ($Type == 1) {
    //Search email
    $searchEmail = "SELECT * FROM users WHERE email='$Email'";
    $ConfEmail = mysqli_query($Conn->Conect(), $searchEmail);

    if (mysqli_num_rows($ConfEmail) > 0) {
        $Response["Code"] = 1;
        $Response["Messaje"] = "Correo verificado.";
        //Genereate Token
        $Token = GetToken(8);

        //Token Encrypt
        $TokenEncrypt = password_hash($Token, PASSWORD_BCRYPT);

        $InserToken = "UPDATE users SET remember_token= '$TokenEncrypt'  WHERE email = '$Email'";
        $ConfInsert = mysqli_query($Conn->Conect(), $InserToken);
        //send email
        $Response["Status"] =  $Emm->BodyEmail($Email, $Token);
    } else {
        $Response["Code"] = 0;
        $Response["Messaje"] = "El correo ingresado no esta asociado a una cuenta.";
    }
} else if ($Type == 2) {

    $VerifyToken = "SELECT * FROM users WHERE email= '$Email'";
    $ConfVeryToken = mysqli_query($Conn->Conect(), $VerifyToken);
    $Row = mysqli_fetch_row($ConfVeryToken);

    //Verify token with DataBase
    if (password_verify($TokenSend, $Row[7])) {
        $Response["Code"] = 1;
        $Response["Messaje"] = "Token Correcto...";
    } else {
        $Response["Code"] = 0;
        $Response["Messaje"] = "Token Incorrecto.";
    }
} else if ($Type == 3) {
    //Password Encrypt
    $PasswordEncrypt = password_hash($NewPassword, PASSWORD_BCRYPT);

    //Update Password
    $UpdateNeewPassword = "UPDATE users SET password ='$PasswordEncrypt' WHERE email = '$Email'";
    $ConfigNewPass = mysqli_query($Conn->Conect(), $UpdateNeewPassword);

    if ($UpdateNeewPassword) {
        $Response["Code"] = 1;
        $Response["Messaje"] = "Se ha cambiado la Contraseña, Inicie Sesión.";

        //Update Token
        $UpdateCamToken = "UPDATE users SET remember_token ='' WHERE email = '$Email'";
        $ConfigUpdateToken = mysqli_query($Conn->Conect(), $UpdateCamToken);
    } else {
        $Response["Code"] = 0;
        $Response["Messaje"] = "¡Vaya!,Ocurrio un error...intentalo más tarde ";
    }
}
echo  json_encode($Response);
