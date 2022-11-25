import React, { useState, useEffect } from "react";
import { StatusBar, BackHandler } from "react-native";
import { StyleSheet, View, Text, TextInput, Alert, ImageBackground, ToastAndroid, ActivityIndicator, Keyboard } from "react-native";
import { SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Tooltip from 'react-native-walkthrough-tooltip';
import Btn_Reset from "../Components/Buttons";

const imgbackground = require('../Images/backgroundApp.jpg');

const ResetPass = ({ navigation }) => {

    //Detect back Button
    const backAction = () => {
        return true;
    }

    //Prevent back hardware
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    const [Email, setEmail] = useState("");
    const [Token, setToken] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [receiveToken, setReceiveToken] = useState(false);
    const [ErrorEmail, setErrorEmail] = useState(false);
    const [ErrorToken, setErrorToken] = useState(false);
    const [TooltipToken, setTooltipToken] = useState(false);

    useEffect(() => {
        console.log("Entre")
        // setReceiveToken(false)
    }, [])

    //Validate exist Email
    function ValidateData() {
        if (receiveToken) {//proceso de recuperar password
            if (Token == "") {
                setErrorToken(true)
                setTooltipToken(true)
                setTimeout(() => {
                    setErrorEmail(false)
                }, 3000);
            } else {
                Keyboard.dismiss()
                setLoading(true)
                setTimeout(function () {
                    ResetPass(2)
                }, 3000)
            }
        } else {//proceso de verificar password
            if (Email == "") {
                setErrorEmail(true)
                setTimeout(() => {
                    setErrorEmail(false)
                }, 2500);
            } else {
                Keyboard.dismiss()
                setLoading(true)
                setTimeout(function () {
                    ResetPass(1)
                }, 2500)
            }
        }
    }

    //Const Tooltip 
    const ContentTooltip = () => {
        return (
            <View style={{ width: 350, paddingBottom: 10 }}>
                <Text>Pista:</Text>
                <Text><AntDesign name="check" size={18} color="green" /> Debe de ingrsar el token recibido por Email </Text>
                <Text><AntDesign name="check" size={18} color="green" /> El token es de 8 digitos. </Text>
            </View>
        )
    }

    const ResetPass = (key) => {
        switch (key) {
            case 1:
                fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Email/SendEmail.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        EmailSend: Email,
                        Process: 1
                    })
                }).then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setLoading(false)
                        if (data.Code == 0) {
                            ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                        } else if (data.Code == 1) {
                            ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                            console.log("hasta aqui")
                            setReceiveToken(true)
                        }
                    })
                break;

            case 2:
                fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Email/SendEmail.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        EmailSend: Email,
                        TokenSend: Token,
                        Process: 2
                    })
                }).then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setLoading(false)
                        if (data.Code == 0) {
                            ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                        } else if (data.Code == 1) {
                            ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                            setTimeout(function () {
                                navigation.navigate('NewPass', {
                                    Pemail: Email
                                })
                            }, 1000)
                        }
                    })
                break;

            default:
                break;
        }
    }

    return (
        <ImageBackground source={imgbackground} style={styles.container}>
            <SafeAreaView>
                <View>
                    <View style={{ marginBottom: 50 }}>
                        <Text style={styles.txtform}>RECUPERAR</Text>
                        <Text style={styles.txtform}>CONTRASEÑA</Text>
                    </View>
                </View>
                <View>
                    {!receiveToken ?
                        <View>
                            <Text style={styles.labelsA}>CORREO ELECTRONICO</Text>
                            <TextInput keyboardType='email-address' style={[styles.inputs, ErrorEmail ? styles.InputsError : null]} placeholder={'Correo electronico'}
                                value={Email}
                                onChangeText={val => setEmail(val)}>
                            </TextInput>
                            {ErrorEmail ? <Text style={styles.Error}>*Por favor ingresa un correo electronico.</Text> : null}
                        </View> : null}

                    {receiveToken ?
                        <View>
                            <Tooltip
                                isVisible={TooltipToken}
                                content={ContentTooltip()}
                                placement="top"
                                onClose={() => setTooltipToken(false)}
                                disableShadow={false}
                                showChildInTooltip={false}>
                                <Text style={[styles.labelsA, { marginTop: 10 }]}>TOKEN</Text>
                                <TextInput keyboardType='default' style={[styles.inputs, ErrorToken ? styles.InputsError
                                    : null]} placeholder={'Token'}
                                    value={Token}
                                    onChangeText={val => setToken(val)}>
                                </TextInput>
                            </Tooltip>
                            {ErrorToken ? <Text style={styles.Error}>*Debe de ingresar el Token recibido por email.</Text> : null}
                        </View> : null}
                </View>
                <View style={{ alignItems: 'center', marginTop: 35 }}>
                    {isLoading ? <ActivityIndicator size="large" /> : null}
                    <Btn_Reset text={'ENVIAR'} onPress={() => {
                        ValidateData()
                    }} />
                    <Btn_Reset text={'CANCELAR'} onPress={() => {
                        navigation.navigate('Login')
                    }} />
                </View>
                <StatusBar style='light' backgroundColor='#0A130E' />
            </SafeAreaView>
        </ImageBackground >
    )
}

export default ResetPass


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtform: {
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    labelsA: {
        fontSize: 15,
        color: 'white',
        textAlign: 'left',
        marginBottom: 15
    },
    inputs: {
        backgroundColor: '#E8F0FE',
        width: 300,
        height: 50,
        fontSize: 20,
        paddingLeft: 5,
        marginBottom: 5
    },
    InputsError: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
    Error: {
        color: "red",
        fontSize: 16
    },
})