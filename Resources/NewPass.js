import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { StyleSheet, View, Text, TextInput, Button, Alert, ImageBackground } from "react-native";
import Btn_Login from "../Components/Buttons";

const imgbackground = require('../Images/backgroundApp.jpg')

const NewPass = ({ navigation }) => {
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
                    <TextInput style={styles.inputs} secureTextEntry={true} placeholder={'Contraseña'}></TextInput>
                    <Text style={styles.labelsA}>CONFIRMAR CONTRASEÑA</Text>
                    <TextInput style={styles.inputs} secureTextEntry={true} placeholder={'Contraseña'}></TextInput>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Btn_Login text={'ENVIAR'} />
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