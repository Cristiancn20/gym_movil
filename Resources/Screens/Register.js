import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput, ImageBackground, ActivityIndicator, ToastAndroid, TouchableOpacity, Keyboard } from "react-native";
import Tooltip from 'react-native-walkthrough-tooltip';
import { SafeAreaView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Btn_Login from "../Components/Buttons";
const imgbackground = require('../Images/backgroundApp.jpg');

const Register = ({ navigation }) => {
    //Use estate
    const [isLoading, setLoading] = useState(false);
    const [Name, setname] = useState("");
    const [Ussername, setUsssername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [TooltipName, setTooltipName] = useState(false);
    const [TooltipUsser, setTooltipUsser] = useState(false);
    const [TooltipCorreo, setTooltipCorreo] = useState(false);
    const [TooltipPassword, setTooltipPassword] = useState(false);

    //use state errors
    const [ErrorNombre, setErrorNombre] = useState(false);
    const [ErrorNombreM, setErrorNombreM] = useState("");
    const [ErrorUssername, setErrorUssername] = useState(false);
    const [ErrorUssernameM, setErrorUssernameM] = useState("");
    const [ErrorCorreo, setErrorCorreo] = useState(false);
    const [ErrorCorreoM, setErrorCorreoM] = useState("");
    const [ErrorPassword, setErrorPassword] = useState(false);
    const [ErrorPasswordM, setErrorPasswordM] = useState("");

    const ContentTooltipName = () => {
        return (
            <View style={{ width: 350, paddingBottom: 10 }}>
                <Text>Formato para el Nombre:</Text>
                <Text><AntDesign name="check" size={18} color="green" /> Minimo 3 letras y Maximo 40. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Solo se pueden usar letras. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> No se permiten simbolos especiales. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> No se permiten signos de puntuación. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> No se permiten números. </Text>
            </View>
        )
    }

    const ContentTooltipUsser = () => {
        return (
            <View style={{ width: 350, paddingBottom: 10 }}>
                <Text>Formato para el Usuario:</Text>
                <Text><AntDesign name="check" size={18} color="green" /> Minimo 3 letras y Maximo 15. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Se permiten letras Minusculas y Mayusculas. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Se permiten números. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> No se permiten simbolos especiales. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> No se permiten signos de puntuación. </Text>
            </View>
        )
    }

    const ContentTooltipCorreo = () => {
        return (
            <View style={{ width: 350, paddingBottom: 10 }}>
                <Text>Formato para el Correo:</Text>
                <Text><AntDesign name="check" size={18} color="green" /> Debe contener un formato de correo. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Debe terminar con un indicador de dominio (.com, .edu, .mx</Text>
                <Text style={{ paddingLeft: 15 }}> .cl, etc...). </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Debe contener el caracter @. </Text>
            </View>
        )
    }

    const ContentTooltipPassword = () => {
        return (
            <View style={{ width: 350, paddingBottom: 10 }}>
                <Text>Formato para la contraseña:</Text>
                <Text><AntDesign name="check" size={18} color="green" /> Minimo 8 caracteres y Maximo 16. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Almenos una letra Mayuscula. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Almenos una letra Minuscula. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Almenos un número. </Text>
                <Text><AntDesign name="check" size={18} color="green" /> Almenos un caracter especial. </Text>
            </View>
        )
    }

    //Show Error
    function ShowError(key) {
        switch (key) {
            case 1:
                setTimeout(function () {
                    setErrorNombre(false)
                }, 3000)
                break;
            case 2:
                setTimeout(function () {
                    setErrorUssername(false)
                }, 3000)
                break;
            case 3:
                setTimeout(function () {
                    setErrorCorreo(false)
                }, 3000)
                break;
            case 4:
                setTimeout(function () {
                    setErrorPassword(false)
                }, 3000)
                break;

            default:
                break;
        }
    }

    //Validation of Email
    function validateEmail(value) {
        return value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    //validate data 
    const Valdata = () => {
        if (Name == "") {
            setErrorNombreM("*El campo Nombre no puede quedar vacio.")
            setErrorNombre(true)
            ShowError(1)
        } else if (!Name.match(/([A-Z, a-z, ñ,Ñ]){8,}$/)) {
            setErrorNombre(true)
            setErrorNombreM("Por favor, ingrese un nombre valido.")
            ShowError(1)
            setTooltipName(true)
        }
        else if (Ussername == "") {
            setErrorUssernameM("*El campo Usuario no puede quedar vacio.")
            setErrorUssername(true)
            ShowError(2)
        } else if (!Ussername.match(/([0-9, A-Z, a-z, ñ,Ñ]{8,}$)/)) {
            setErrorUssernameM("Por favor, ingrese un usuario valido.")
            setErrorUssername(true)
            ShowError(2)
            setTooltipUsser(true)
        } else if (Email == "") {
            setErrorCorreoM("*El campo Email no puede quedar vacio.")
            setErrorCorreo(true)
            ShowError(3)
        }
        else if (!validateEmail(Email)) {
            setErrorCorreoM("Por favor, Ingrese un correo valido.")
            setErrorCorreo(true)
            ShowError(3)
            setTooltipCorreo(true)
        } else if (Password == "") {
            setErrorPasswordM("*El campo Password no puede quedar vacio.")
            setErrorPassword(true)
            ShowError(4)
        } else if (!Password.match(/^(?=.*[a-z, ñ])(?=.*[A-Z, Ñ])(?=.*\d)(?=.*[#_$@$!%*?&])[A-Za-z\d#_$@$!%*?&]{8,16}$/)) {
            setErrorPasswordM("Por favor, Ingrese un password valido.")
            setErrorPassword(true)
            ShowError(4)
            setTooltipPassword(true)
        } else {
            RegisterAuth()
        }
    }

    //Method to Register
    const RegisterAuth = () => {
        setLoading(true)
        //fetch
        Keyboard.dismiss()
        try {
            fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Register.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FName: Name,
                    FUssername: Ussername,
                    FEmail: Email,
                    FPassword: Password
                })
            }).then((response) => response.json())
                .then((data) => {
                    setLoading(false)
                    if (data.Code == -1) {//Incorrecto
                        ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                    } else if (data.Code == 0) {//Ya existe
                        ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                    } else if (data.Code == 1) {//Correcto
                        ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                        setTimeout(function () {
                            navigation.navigate('Login')
                        }, 2000)
                    }
                })
        } catch (error) {
            ToastAndroid(error, ToastAndroid.LONG)
        }
    }

    return (
        <ImageBackground source={imgbackground} style={styles.container}>
            <SafeAreaView>
                <View>
                    <Text style={styles.txtform}>CREAR CUENTA</Text>
                    <Text style={styles.labelsA}>NOMBRE <AntDesign name="questioncircle" onPress={() => { setTooltipName(true) }} size={18} color="white" /></Text>
                    <Tooltip
                        isVisible={TooltipName}
                        content={ContentTooltipName()}
                        placement="top"
                        onClose={() => setTooltipName(false)}
                        disableShadow={false}
                        showChildInTooltip={false}>
                        <TextInput style={[styles.inputs, ErrorNombre ? styles.InputsError : null]}
                            placeholder={'Nombre completo'}
                            onChangeText={val => setname(val)}
                            value={Name}
                            maxLength={40}>
                        </TextInput>
                    </Tooltip>
                    {ErrorNombre ? <Text style={styles.Error}>{ErrorNombreM}</Text> : null}

                    <Text style={styles.labelsA}>USSERNAME <AntDesign name="questioncircle" onPress={() => { setTooltipUsser(true) }} size={18} color="white" /></Text>
                    <Tooltip
                        isVisible={TooltipUsser}
                        content={ContentTooltipUsser()}
                        placement="top"
                        onClose={() => setTooltipUsser(false)}
                        disableShadow={false}
                        showChildInTooltip={false}>
                        <TextInput style={[styles.inputs, ErrorUssername ? styles.InputsError : null]}
                            placeholder={'Nombre de usuario'}
                            onChangeText={val => setUsssername(val)}
                            value={Ussername}
                            maxLength={15}>
                        </TextInput>
                    </Tooltip>
                    {ErrorUssername ? <Text style={styles.Error}>{ErrorUssernameM}</Text> : null}

                    <Text style={styles.labelsA}>CORREO ELECTRONICO <AntDesign name="questioncircle" onPress={() => { setTooltipCorreo(true) }} size={18} color="white" /></Text>
                    <Tooltip
                        isVisible={TooltipCorreo}
                        content={ContentTooltipCorreo()}
                        placement="top"
                        onClose={() => setTooltipCorreo(false)}
                        disableShadow={false}
                        showChildInTooltip={false}>
                        <TextInput style={[styles.inputs, ErrorCorreo ? styles.InputsError : null]} keyboardType='email-address'
                            placeholder={'Correo Electronico'}
                            onChangeText={val => setEmail(val)}
                            value={Email}>
                        </TextInput>
                    </Tooltip>
                    {ErrorCorreo ? <Text style={styles.Error}>{ErrorCorreoM}</Text> : null}

                    <Text style={styles.labelsA}>CONTRASEÑA <AntDesign name="questioncircle" onPress={() => { setTooltipPassword(true) }} size={18} color="white" /></Text>
                    <Tooltip
                        isVisible={TooltipPassword}
                        content={ContentTooltipPassword()}
                        placement="top"
                        onClose={() => setTooltipPassword(false)}
                        disableShadow={false}
                        showChildInTooltip={false}>
                        <TextInput style={[styles.inputs, ErrorPassword ? styles.InputsError : null]}
                            secureTextEntry={passwordVisible}
                            placeholder={'Contraeña'}
                            onChangeText={val => setPassword(val)}
                            value={Password}
                            maxLength={16}>
                        </TextInput>
                    </Tooltip>
                    {ErrorPassword ? <Text style={styles.Error}>{ErrorPasswordM}</Text> : null}

                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome5 name={passwordVisible ? "eye" : "eye-slash"} size={20} color="black" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Btn_Login text={'ENVIAR'} onPress={() => Valdata()} />
                        {isLoading ? <ActivityIndicator size="large" /> : null}
                    </View>
                    <Text onPress={() => {
                        navigation.navigate('Login')
                    }} style={{ textDecorationLine: 'underline', color: 'white', fontSize: 18, textAlign: 'center' }}>¿Ya tienes una cuenta?</Text>
                </View>
                <StatusBar style='light' backgroundColor='#0A130E' />
            </SafeAreaView>
        </ImageBackground >
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtform: {
        fontSize: 35,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 200
    },
    labelsA: {
        fontSize: 20,
        color: 'white',
        textAlign: 'left',
        marginBottom: 15,
        marginTop: 10
    },
    labelsB: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    inputs: {
        backgroundColor: '#E8F0FE',
        width: 300,
        height: 50,
        fontSize: 20,
        paddingLeft: 5,
    },
    InputsError: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
    Error: {
        color: "red",
        fontSize: 16
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 80,
        alignContent: 'center',
        backgroundColor: '#D9D9D9',
        width: 70,
        height: 40,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    }
});
