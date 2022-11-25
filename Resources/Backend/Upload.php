<?php
require_once('ConexionCls.php');
$Conn = new Cls_Conexion();

$img_path = './Img/' . $_FILES['photo']['name'];
$email =  $_POST['email'];
$response = array();
$nameimg = "https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Img/" . $_FILES['photo']['name'];

if (move_uploaded_file($_FILES['photo']['tmp_name'], $img_path)) {
    // verificar
    $searchEmail = "SELECT * FROM tbl_imgussers WHERE email = '$email'";
    $configsearch = mysqli_query($Conn->Conect(), $searchEmail);

    if (mysqli_num_rows($configsearch) == 0) { //no existe
        $insertImg = "INSERT INTO tbl_imgussers (email, ruta ) VALUES ('$email', '$nameimg')";
        $configinsert = mysqli_query($Conn->Conect(), $insertImg);
    } else { //Si existe
        $UpdateImg = "UPDATE tbl_imgussers  SET ruta= '$nameimg' WHERE email= '$email'";
        $configUpdate = mysqli_query($Conn->Conect(), $UpdateImg);
    }

    $response["status"] = 1;
    $response["ruta"] = $nameimg;
    $response["email"] = $email;
} else {
    $response["status"] = 0;
}
echo json_encode($response);
