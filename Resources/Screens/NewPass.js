import React, { useState, useEffect } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { StyleSheet, View, Text, TextInput, ImageBackground, Keyboard, TouchableOpacity, ToastAndroid, ActivityIndicator } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Tooltip from 'react-native-walkthrough-tooltip';
import Btn_Login from "../Components/Buttons";


const imgbackground = require('../Images/backgroundApp.jpg')

const NewPass = ({ route, navigation }) => {

    //Detect back Button
    const backAction = () => {
        return true;
    }

    //Prevent back hardware
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    //Const for UseState
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [PasswordVerify, setPasswordVerify] = useState("");
    const [ErrorPassword, setErrorPassword] = useState(false);
    const [ErrorPasswordM, setErrorPasswordM] = useState(false);
    const [TooltipPassword, setTooltipPassword] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);

    useEffect(() => {
        const { Pemail } = route.params;
        setEmail(Pemail)
    })

    //content Tooltip
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


    //function val data
    function ValData() {
        if (Password == "") {
            setErrorPasswordM("*El campo Password no puede quedar vacio.")
            setErrorPassword(true)
            setTimeout(function () {
                setErrorPassword(false)
            }, 3000)
        } else if (!Password.match(/^(?=.*[a-z, ñ])(?=.*[A-Z, Ñ])(?=.*\d)(?=.*[#_$@$!%*?&])[A-Za-z\d#_$@$!%*?&]{8,16}$/)) {
            setErrorPasswordM("Por favor, Ingrese un password valido.")
            setErrorPassword(true)
            setTooltipPassword(true)
            setTimeout(function () {
                setErrorPassword(false)
            }, 3000)
        } else if (PasswordVerify == "") {
            setErrorPasswordM("*El campo de verificación de Password no puede \n quedar vacio.")
            setErrorPassword(true)
            setTimeout(function () {
                setErrorPassword(false)
            }, 3000)
        } else if (Password != PasswordVerify) {
            console.log(Password)
            console.log(PasswordVerify)
            setErrorPasswordM("*Las contraseñas no coinciden, verifique la \n información.")
            setErrorPassword(true)
            setTimeout(function () {
                setErrorPassword(false)
            }, 3000)
        } else {
            console.log("Todo correcto")
            setLoading(true)
            setTimeout(function () {
                ChanguePassword()
            }, 2000)
        }
    }


    const ChanguePassword = () => {
        fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Email/SendEmail.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmailSend: Email,
                NewPassword: Password,
                Process: 3
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
                        navigation.navigate('Login')
                    }, 1500)
                }
            })
    }

    return (
        <ImageBackground source={imgbackground} style={styles.container}>
            <SafeAreaView>
                <View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.txtform}>CAMBIAR</Text>
                        <Text style={styles.txtform}>CONTRASEÑA</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.labelsA}>NUEVA CONTRASEÑA</Text>
                    <Tooltip
                        isVisible={TooltipPassword}
                        content={ContentTooltipPassword()}
                        placement="top"
                        onClose={() => setTooltipPassword(false)}
                        disableShadow={false}
                        showChildInTooltip={false}>
                        <TextInput style={[styles.inputs, ErrorPassword ? styles.InputsError : null]} secureTextEntry={passwordVisible} placeholder={'Contraseña'}
                            value={Password}
                            onChangeText={val => setPassword(val)}
                            maxLength={16}>
                        </TextInput>
                    </Tooltip>
                    {ErrorPassword ? <Text style={styles.Error}>{ErrorPasswordM}</Text> : null}
                    <Text style={styles.labelsA}>CONFIRMAR CONTRASEÑA</Text>
                    <TextInput style={styles.inputs} secureTextEntry={passwordVisible} placeholder={'Contraseña'}
                        value={PasswordVerify}
                        onChangeText={val => setPasswordVerify(val)}></TextInput>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                <FontAwesome5 name={passwordVisible ? "eye" : "eye-slash"} size={20} color="black" />
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {isLoading ? <ActivityIndicator size="large" style={{ marginBottom: 10, marginTop: 10 }} /> : null}
                    <Btn_Login text={'ENVIAR'} onPress={() => {
                        Keyboard.dismiss()
                        setTimeout(function () {
                            ValData()
                        }, 100)
                    }} />
                    <Btn_Login text={'REGRESAR'} onPress={() => {
                        navigation.navigate('ResetPass')
                    }} />
                </View>
            </SafeAreaView>
        </ImageBackground>

    )
}



export default NewPass


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
        marginBottom: 5,
        marginTop: 10
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
    button: {
        marginTop: 10,
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
})