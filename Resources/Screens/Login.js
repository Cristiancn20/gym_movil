import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Keyboard, Text, TextInput, View, TouchableOpacity, ImageBackground, Alert, BackHandler, ActivityIndicator, FlatList, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Btn_Login from '../Components/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
const imgbackground = require('../Images/backgroundApp.jpg');

const Login = ({ navigation }) => {

    //UseState
    const [isLoading, setLoading] = useState(false);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [ErrorCorreo, setErrorCorreo] = useState(false);
    const [ErrorCorreoM, setErrorCorreoM] = useState("");
    const [ErrorPassword, setErrorPassword] = useState(false);
    const [ErrorPasswordM, setErrorPasswordM] = useState("");

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    //Save data in AsyncStorage
    const SaveData = async (Asyname, AsyUssername, AsyEmail, AsyRuta, AsyMembresia, AsyInicio, AsyFinal) => {
        try {
            await AsyncStorage.setItem('@name', Asyname)
            await AsyncStorage.setItem('@Usser', AsyUssername)
            await AsyncStorage.setItem('@Email', AsyEmail)
            if (AsyRuta == null || AsyRuta == '') {
                await AsyncStorage.setItem('@ruta', "N/A")
            } else {
                await AsyncStorage.setItem('@ruta', AsyRuta)
            }
            if (AsyMembresia == null || AsyRuta == '') {
                await AsyncStorage.setItem('@Membresia', "FALSE")
            } else {
                await AsyncStorage.setItem('@Membresia', AsyMembresia)
            }
            if (AsyInicio == null || AsyRuta == '') {
                await AsyncStorage.setItem('@Inicio', "empty")
            } else {
                await AsyncStorage.setItem('@Inicio', AsyInicio)
            }
            if (AsyFinal == null || AsyRuta == '') {
                await AsyncStorage.setItem('@Fin', "empty")
            } else {
                await AsyncStorage.setItem('@Fin', AsyFinal)
            }
        } catch (error) {
            Alert.alert("Error" + error)
        }
    }

    //Show Error
    function ShowError(key) {
        switch (key) {
            case 1:
                setTimeout(function () {
                    setErrorCorreo(false)
                }, 3000)
                break;
            case 2:
                setTimeout(function () {
                    setErrorPassword(false)
                }, 3000)
                break;
            default:
                break;
        }
    }

    //Normalizar Estados
    const NormaliceStates = () => {
        setLoading(false)
        setEmail("")
        setPassword("")
    }

    //Metodo Auth[Login]
    const AccessAuth = async () => {
        setLoading(true)
        if (Email == "") {
            setLoading(false)
            setErrorCorreoM("*El campo Email no puede quedar vacio.")
            setErrorCorreo(true)
            ShowError(1)

        } else if (Password == "") {
            setLoading(false)
            setErrorPasswordM("*El campo Password no puede quedar vacio.")
            setErrorPassword(true)
            ShowError(2)
        }
        else {
            //fetch
            Keyboard.dismiss()
            try {

                fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Auth.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        EmailSend: Email,
                        PasswordSend: Password
                    })
                }).then((response) => response.json())
                    .then((data) => {
                        setLoading(false)
                        if (data.Code == 0) {
                            ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                        } else if (data.Code == -1) {
                            ToastAndroid.show(data.Messaje, ToastAndroid.LONG)
                        } else {
                            const ussernamecomplet = data[0].name
                            const ussername = data[0].Username
                            const usseremail = data[0].email
                            const usserruta = data[1].ruta
                            const ussermembresia = data[2].membresia
                            const usserinicio = data[3].fechaini
                            const usserfinal = data[4].fechafin
                            navigation.navigate('ContainerFragment', {
                                user: ussernamecomplet
                            })
                            SaveData(ussernamecomplet, ussername, usseremail, usserruta, ussermembresia, usserinicio, usserfinal)
                            NormaliceStates()
                        }
                    })
            } catch (error) {
                ToastAndroid.show("Error: " + error, ToastAndroid.LONG)
            }
        }
    }

    return (
        <ImageBackground source={imgbackground} style={styles.container}>
            <SafeAreaView>
                <View>
                    <Text style={styles.txtform}>LOGIN</Text>
                    <Text style={styles.labelsA}>CORREO ELECTRONICO</Text>
                    <TextInput keyboardType='email-address' style={[styles.inputs, ErrorCorreo ? styles.InputsError : null]} placeholder={'Correo electronico'}
                        value={Email}
                        onChangeText={val => setEmail(val)}>
                    </TextInput>
                    {ErrorCorreo ? <Text style={styles.Error}>{ErrorCorreoM}</Text> : null}

                    <Text style={styles.labelsA}>CONTRASEÑA</Text>
                    <TextInput secureTextEntry={passwordVisible} style={[styles.inputs, ErrorPassword ? styles.InputsError : null]} placeholder={'Contraseña'}
                        value={Password}
                        onChangeText={val => setPassword(val)}>
                    </TextInput>
                    {ErrorPassword ? <Text style={styles.Error}>{ErrorPasswordM}</Text> : null}

                    <Text onPress={() => {
                        navigation.navigate('ResetPass')
                    }} style={styles.labelsB} >¿Olvidaste tu contraseña?</Text>

                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    <FontAwesome5 name={passwordVisible ? "eye" : "eye-slash"} size={20} color="black" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Btn_Login text={'ENVIAR'} onPress={() => AccessAuth()} />
                        {isLoading ? <ActivityIndicator size="large" /> : null}
                    </View>

                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>¿Aun no tienes una cuenta?</Text>

                    <Text onPress={() => {
                        navigation.navigate('Register')
                    }} style={{ textDecorationLine: 'underline', color: 'white', fontSize: 18, textAlign: 'center' }}>Registrate</Text>
                </View>
                <StatusBar style='light' backgroundColor='#0A130E' />
            </SafeAreaView>
        </ImageBackground>
    );
}

export default Login

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
        marginBottom: 30,
        marginTop: 150
    },
    labelsA: {
        fontSize: 20,
        color: 'white',
        textAlign: 'left',
        marginBottom: 10,
        marginTop: 20
    },
    labelsB: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginTop: 15
    },
    inputs: {
        backgroundColor: '#E8F0FE',
        width: 300,
        height: 50,
        fontSize: 20,
        paddingLeft: 5,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 80,
        alignContent: 'center',
        backgroundColor: '#D9D9D9',
        marginTop: 10,
        width: 70,
        height: 40,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    InputsError: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
    Error: {
        color: "red",
        fontSize: 16
    },
});



