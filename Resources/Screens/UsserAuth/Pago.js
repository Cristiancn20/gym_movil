import { StatusBar } from "react-native";
import { StyleSheet, View, Button, Text, TextInput, SafeAreaView, BackHandler, Alert, Image } from "react-native";
import Btn_Login from "../../Components/Buttons";

const ImgPerfil = require('../../Images/RN_EmptyUsser.png');
const imgCard = require('../../Images/CreditCard.png');
const Pagos = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.Container}>
                <View style={{ flex: 1, marginTop: 60 }}>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>FORMATO DE PAGO</Text>
                    <Text style={{ fontSize: 15, textAlign: 'left', fontWeight: 'bold' }}>No se hará ningun cargo hasta que realices una compra</Text>
                    <Image resizeMode={'stretch'} source={imgCard} style={{ width: 390, height: 250, borderRadius: 10, marginBottom: 30 }}></Image>
                    <Text style={{ fontSize: 20, textAlign: 'left' }}>Numero de tarjeta:</Text>
                    <TextInput keyboardType='numeric' style={styles.inputs} placeholder={'1234 5678 9175 6248'}></TextInput>
                    <Text style={{ fontSize: 20, textAlign: 'left' }}>Caduca (Fecha de expiración):</Text>
                    <TextInput keyboardType='numeric' style={styles.inputs} placeholder={'12/22'}></TextInput>
                    <Text style={{ fontSize: 20, textAlign: 'left' }}>CVV:</Text>
                    <TextInput keyboardType='numeric' style={styles.inputs} placeholder={'915'}></TextInput>
                    <Text style={{ fontSize: 20, textAlign: 'left' }}>Dirección de facturación:</Text>
                    <TextInput keyboardType='default' style={styles.inputs} placeholder={'Huejutla de Reyes, HGO, 430001'}></TextInput>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Btn_Login text={'TERMINAR'} onPress={() => Alert.alert("Configuración de Pago exitosa")} />
                        <Btn_Login text={'REGRESAR'} onPress={() => navigation.goBack()} />
                    </View>
                </View>
            </View>
            <StatusBar style='light' backgroundColor='#0A130E' />
        </SafeAreaView>
    )
}

export default Pagos

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },
    labelsA: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
        marginBottom: 5
    },
    inputs: {
        backgroundColor: '#E8F0FE',
        width: 300,
        height: 50,
        fontSize: 20,
        paddingLeft: 5,
        marginBottom: 20
    },
    inputs: {
        backgroundColor: '#E8F0FE',
        height: 50,
        fontSize: 20,
        paddingLeft: 5,
        marginBottom: 15,
        borderRadius: 5
    },
})