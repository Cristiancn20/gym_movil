<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="shortcut icon" href="https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/logo_gym_gv.png">
    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" />
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <title>Upload news!</title>
    <link rel="stylesheet" href="styles.css">

</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="http://gymvirtualuthh.proyectoarp.com/">
            <img src="https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/logo_gym_gv.png" alt="" width="80px" height="80px">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <h5>Administrador</h5>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <a href="http://gymvirtualuthh.proyectoarp.com/" style="color:black">gymvirtualuthh.proyectoarp.com</a>
            </form>
        </div>
    </nav>
    <!-- Fin de Navbar -->
    <div class="container">
        <div class="row">
            <div class='card col-12 mx-auto'>
                <div class="col-10 mx-auto">
                    <div class="col-12">
                        <center>
                            <br>
                            <h3>Carga de noticas!</h3>
                            <hr>
                        </center>
                    </div>
                    <div class="col-12">
                        <form action="https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/Uploadnews.php" method="POST" enctype="multipart/form-data" id="formNew">
                            <div class="form-group">
                                <label>Titulo de la Noticia:</label>
                                <input type="text" class="form-control form-control-sm" id="Title" aria-describedby="emailHelp" placeholder="Title here!">
                            </div>
                            <div class="form-group">
                                <label>Subtitulo:</label>
                                <input type="text" class="form-control form-control-sm" id="subtitle" placeholder="Subtitle here!">
                            </div>
                            <div class="form-group">
                                <label>A帽o:</label>
                                <input type="number" class="form-control form-control-sm" id="anio" placeholder="Year here!">
                            </div>
                            <div class="form-group">
                                <label>Descripci贸n:</label>
                                <input type="text" class="form-control form-control-sm" id="description" placeholder="Description here">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Imagen:</label>
                                <input type="file" class="form-control-file form-control-sm" id="image">
                            </div>
                            <div class="form-group" style="display: none;" id="div_img">
                                <center>
                                    <img id="imagenPrevisualizacion" width="400px" height="400px">
                                </center>
                            </div>
                            <div class="form-group">
                                <center>
                                    <button style="width: 60%;" class="btn btn-primary" onclick="return ValData()">Subir</button>
                                </center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script>
        const $seleccionArchivos = document.querySelector("#image"),
            $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

        $seleccionArchivos.addEventListener("change", () => {
            // Los archivos seleccionados, pueden ser muchos o uno
            const archivos = $seleccionArchivos.files;
            // Si no hay archivos salimos de la funci贸n y quitamos la imagen
            if (!archivos || !archivos.length) {
                $imagenPrevisualizacion.src = "";
                return;
            }
            var div = document.getElementById('div_img')

            div.style.display = 'block'
            // Ahora tomamos el primer archivo, el cual vamos a previsualizar
            const primerArchivo = archivos[0];
            // Lo convertimos a un objeto de tipo objectURL
            const objectURL = URL.createObjectURL(primerArchivo);
            // Y a la fuente de la imagen le ponemos el objectURL
            $imagenPrevisualizacion.src = objectURL;

        });



        function ValData() {
            event.preventDefault()

            const Titulo = $("#Title").val()
            const Subtitulo = $("#subtitle").val()
            const Anio = $("#anio").val()
            const Descripcion = $("#description").val()

            if (Titulo == "") {
                $("#Title").focus()
                alertify.error('Agrega un titulo')
                return false
            } else if (Subtitulo == "") {
                $("#subtitle").focus()
                alertify.error('Agrega un subtitulo')
                return false
            } else if (Anio == "") {
                $("#anio").focus()
                alertify.error('Agrega un A帽o')
                return false
            } else if (Descripcion == "") {
                $("#description").focus()
                alertify.error('Agrega una descripcion')
                return false
            } else if ($("#image").val() == 0) {
                $("#image").focus()
                alertify.error('Selecciona una imagen')
                return false
            }
            const formdata = new FormData()
            formdata.append("imagen", document.getElementById("image").files[0])
            formdata.append("Title", Titulo)
            formdata.append("subtitle", Subtitulo)
            formdata.append("anio", Anio)
            formdata.append("description", Descripcion)

            SendData(formdata)
            return true

        }


        function SendData(formdata) {
            $(".btn-primary").prop('disabled', true)
            alertify.warning("Subiendo informacion...")
            fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/Uploadnews.php', {
                    method: 'POST',
                    body: formdata
                }).then(response => response.json())
                .then(data => {
                    $(".btn-primary").prop('disabled', false)
                    document.getElementById("formNew").reset()
                    $("#div_img").hide()
                    // console.log(data)
                    if (data.status == 1) {
                        alertify.success("SE subio correctamente")
                    } else {
                        alertify.error("ocurrio un error")
                    }
                })

        }
    </script>
</body>


<?php
require_once('../ConexionCls.php');
$Conn = new Cls_Conexion();

$img_path = './ImgNews/' . $_FILES['imagen']['name'];
$response = array();
$ruta = "https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/ImgNews/" . $_FILES['imagen']['name'];
$title = $_POST['Title'];
$subtitle = $_POST['subtitle'];
$anio = $_POST['anio'];
$description = $_POST['description'];

//move image
if (move_uploaded_file($_FILES['imagen']['tmp_name'], $img_path)) {
    $insertNew = "INSERT INTO tbl_noticias (Titulo, Subtitulo, Anio, Descripcion, Ruta ) VALUES ('$title', '$subtitle', $anio, '$description', '$ruta')";
    $configinsert = mysqli_query($Conn->Conect(), $insertNew);

    if ($insertNew) {
        $response["consulta"] = 1;
    } else {
        $response["consulta"] = 0;
    }

    $response["status"] = 1;
} else {
    $response["status"] = 0;
}
$response["name"] = $ruta;

echo json_encode($response)

?>