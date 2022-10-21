import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, Touchable, Image, TextInput, ImageBackground, Alert } from "react-native";
import { SafeAreaView } from "react-native";
import Btn_Login from "../Components/Buttons";
const imgbackground = require('../Images/backgroundApp.jpg');

const Register = ({ navigation }) => {
    return (
        <ImageBackground source={imgbackground} style={styles.container}>
            <SafeAreaView>
                <View>
                    <Text style={styles.txtform}>CREAR CUENTA</Text>
                    <Text style={styles.labelsA}>NOMBRE</Text>
                    <TextInput style={styles.inputs} placeholder={'Nombre completo'}></TextInput>

                    <Text style={styles.labelsA}>USSERNAME</Text>
                    <TextInput style={styles.inputs} placeholder={'Nombre de usuario'}></TextInput>

                    <Text style={styles.labelsA}>CORREO ELECTRONICO</Text>
                    <TextInput keyboardType='email-address' style={styles.inputs} placeholder={'Correo Electronico'}></TextInput>

                    <Text style={styles.labelsA}>CONTRASEÑA</Text>
                    <TextInput secureTextEntry={true} style={styles.inputs} placeholder={'Contraeña'}></TextInput>
                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        {/* <Btn_Eye /> */}
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Btn_Login text={'ENVIAR'} onPress={() => Alert.alert('Registro Correcto!')} />
                    </View>
                    <Text onPress={() => {
                        navigation.navigate('Login')
                    }} style={{ textDecorationLine: 'underline', color: 'white', fontSize: 18, textAlign: 'center' }}>¿Ya tienes una cuenta?</Text>
                </View>
                <StatusBar style='light' backgroundColor='#0A130E' />
            </SafeAreaView>
        </ImageBackground>
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
        marginBottom: 10
    },
});
