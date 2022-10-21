import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, Text, TextInput, Button, Alert, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native";
import Btn_Reset from "../Components/Buttons";

const imgbackground = require('../Images/backgroundApp.jpg');

const ResetPass = ({ navigation }) => {

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
                    <Text style={styles.labelsA}>CORREO ELECTRONICO</Text>
                    <TextInput keyboardType='email-address' style={styles.inputs} placeholder={'Correo electronico'}></TextInput>
                </View>
                <View style={{ alignItems: 'center', marginTop: 25 }}>
                    <Btn_Reset text={'ENVIAR'} onPress={() => {
                        navigation.navigate('NewPass')
                    }} />
                    <Btn_Reset text={'REGRESAR'} onPress={() => {
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
        marginBottom: 15
    }
})