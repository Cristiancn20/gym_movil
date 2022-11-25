<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

class Cls_Email
{
    public function BodyEmail($Email, $Token)
    {
        $mail = new PHPMailer(true);
        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host       = 'gymvirtualuthh.proyectoarp.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'app@gymvirtualuthh.proyectoarp.com';
            $mail->Password   = 'y$g1sBH05Zpc';
            $mail->SMTPSecure = 'ssl';
            $mail->Port       = 465;

            $mail->addAddress($Email);
            $mail->setFrom('app@gymvirtualuthh.proyectoarp.com', 'System-GymVirtual');

            $mail->isHTML(true);
            $mail->Subject = '[Notificacion: Restablecimiento de Inicio de sesion].';
            $mail->Body    = "
            <!doctype html>
            <html lang='en'>

            <head>
                <meta charset='utf-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous'>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Estonia&family=Montserrat:ital,wght@0,100;0,300;1,100&family=Orbitron&display=swap');

                    * {
                        font-family: 'Montserrat', sans-serif !important;
                        font-weight: bold;
                    }
                </style>
            </head>

            <body>
            <div class='container-fluid' style='padding: 10px;'>
                <div class='row' style='padding: 10px;'>
                    <div class='col-12 col-md-12 card' style='padding: 0;'>
                        <div class='card-header'>
                            <center>
                                <img src='https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Email/RN_LogoApp.png' width='100px' height='100px' alt='logo-gym'>
                            </center>
                        </div>
                        <div class='col-12 mx-auto' style='height: 100% ;padding-bottom: 20px; padding-top:10px;padding-left:20px;padding-right:20px; text-align:justify;'>
                            <h1><b>¡Hola!</b></h1>
                            <h2>
                                <small>
                                    Hola, se solicitó un restablecimiento de contraseña relacionado a la cuenta <b>$Email</b>, copia el token de autorización en el formulario de la App que aparece
                                    más adelante para poder cambiar de contraseña.
                                </small>
                            </h2><br>
                            <center>
                                <h2>Token</h2>
                                <h1><b>$Token</b></h1>
                            </center><br>
                            <h2>
                                <small>
                                    Si tu no realizaste la solicitud de cambio de contraseña, solo ignora este correo.
                                </small>
                            </h2>
                            <h2>
                                <small>
                                    El token solo es valido durante 60 minutos.
                                </small>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
                <script src='https://code.jquery.com/jquery-3.2.1.slim.min.js' integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN' crossorigin='anonymous'></script>
                <script src='https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js' integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q' crossorigin='anonymous'></script>
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js' integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl' crossorigin='anonymous'></script>
            </body>

            </html>
            ";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            return 'Success';
        } catch (Exception $e) {
            return "Error: {$mail->ErrorInfo}";
        }
    }
}