<?php
require_once('../ConexionCls.php');
$Conn = new Cls_Conexion();

$getData = "SELECT * FROM tbl_noticias";
$configgetdata = mysqli_query($Conn->Conect(), $getData);
$Response = array();

//mientras haya datos los ingresa en un array
while ($row = $configgetdata->fetch_array(MYSQLI_ASSOC)) {
    $Response[] = $row;
}
echo json_encode($Response, JSON_UNESCAPED_UNICODE);
