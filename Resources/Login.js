import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Btn_Login from '../Components/Buttons';
import { FontAwesome5 } from '@expo/vector-icons';
const imgbackground = require('../Images/backgroundApp.jpg');

const Login = ({ navigation }) => {

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

    const [text, setText] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);

    const Access = () => {
        // Alert.alert("Inicio de autenticacion")
        navigation.navigate('ContainerFragment')
    }

    return (
        <ImageBackground source={imgbackground} style={styles.container}>
            <SafeAreaView>
                <View>
                    <Text style={styles.txtform}>LOGIN</Text>
                    <Text style={styles.labelsA}>CORREO ELECTRONICO</Text>
                    <TextInput keyboardType='email-address' style={styles.inputs} placeholder={'Correo electronico'}></TextInput>
                    <Text style={styles.labelsA}>CONTRASEÑA</Text>
                    <TextInput secureTextEntry={passwordVisible} style={styles.inputs} placeholder={'Contraseña'}></TextInput>
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
                        <Btn_Login text={'ENVIAR'} onPress={() => Access()} />
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
        marginBottom: 15
    },
    labelsB: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    inputs: {
        backgroundColor: '#E8F0FE',
        width: 300,
        height: 50,
        fontSize: 20,
        paddingLeft: 5,
        marginBottom: 15
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

    }
});
