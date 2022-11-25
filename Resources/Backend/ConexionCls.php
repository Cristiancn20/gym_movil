<?php

class Cls_Conexion
{
    const usser = 'proye341_wear_usser';
    const password = 'z+ZSA5_L4?%Y';
    const database = 'proye341_gymvirtual';
    const host = 'localhost';

    public function Conect()
    {
        $Conected = new mysqli(
            self::host,
            self::usser,
            self::password,
            self::database,
        );

        if ($Conected->connect_errno) {
            die("Conexion error =>" . $Conected->connect_errno);
        }
        return $Conected;
    }
}
