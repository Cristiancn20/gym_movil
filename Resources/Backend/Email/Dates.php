<?php

class Cls_Dates
{

    public function FDate()
    {
        //Get date
        $Dia = date("d");
        $Mes = date("m");
        $Anio = date("Y");
        $Fecha = ($Dia . "-" . $Mes . "-" . $Anio);
        return $Fecha;
    }

    public function FDay()
    {
        //Get Day 
        $Dia = date("l");
        if ($Dia == "Monday") {
            $Dia_Actualy = "Lunes";
        } else if ($Dia == "Tuesday") {
            $Dia_Actualy = "Martes";
        } else if ($Dia == "Wednesday") {
            $Dia_Actualy = "Miercoles";
        } else if ($Dia == "Thursday") {
            $Dia_Actualy = "Jueves";
        } else if ($Dia == "Friday") {
            $Dia_Actualy = "Viernes";
        } else if ($Dia == "Saturday") {
            $Dia_Actualy = "Sabado";
        } else if ($Dia == "Sunday") {
            $Dia_Actualy = "Domingo";
        }
        return $Dia_Actualy;
    }

    public function FHourPoint()
    {
        //get Hour o´clok
        $HoraPoint = (date("G") . ":00");
        return $HoraPoint;
    }

    public function FHourComplet()
    {
        //Get Hour complet
        $Hora = date("G");
        $Minutos = date("i");
        $HourComplet =  ("$Hora" . ":" . "$Minutos");
        return $HourComplet;
    }
}
