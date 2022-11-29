import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image, TouchableHighlight, TextInput } from "react-native";
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Btn_Login from "../../Components/Buttons";
import Constants from 'expo-constants';

const ImgPerfil = require('../../Images/RN_EmptyUsser.png');
const Logo = require('../../Images/RN_LogoApp.png');
const Membresia = require('../../Images/MembresiaGym.png');

const Pagos = ({ navigation, route }) => {

    //useS State
    const [paypal, setpaypal] = useState(false);
    const [isloading, setloading] = useState(false);
    const [existSuscription, setExistSuscription] = useState(false);
    const [Pnombre, setNombre] = useState("");


    //use Effect
    useEffect(() => {
        // setpaypal(false)
        // setloading(false)
        const { NameUsser } = route.params;
        setNombre(NameUsser)
    }, [])

    return (
        <View style={styles.Container}>
            {existSuscription ?
                // SI existe una suscripcion
                <View style={{ flex: 1, width: "100%", backgroundColor: '#ffff', zIndex: -1 }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: -100
                    }}>
                        <View style={{ width: 20, alignItems: 'center' }}>
                            <Image source={Membresia} style={{ width: 370, height: 250 }}></Image>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'flex-end', marginRight: 150, marginTop: -65 }}>
                                <View style={{
                                    width: 60, height: 60, borderRadius: 70 / 2,
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Image source={Logo} style={{ width: 100, height: 100, marginTop: 35 }} ></Image>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 120 }}>
                            <Text style={[styles.labelsA, { textAlign: 'center', fontWeight: 'bold' }]}>MEMBRESIA ADQUIRIDA</Text>
                            <Text style={styles.labelsA}>Detalles:</Text>
                            <View style={{ height: 1, width: 250, backgroundColor: 'gray' }}></View>
                            <Text style={styles.labelsA}>Nombre:</Text>
                            <TextInput style={styles.inputs} placeholder={'Nombre'}
                                value={Pnombre} editable={false}>
                            </TextInput>
                            <Text style={styles.labelsA}>Tipo:</Text>
                            <TextInput style={styles.inputs} placeholder={'Tipo de membresia'}
                                value={"Premium"} editable={false}>
                            </TextInput>
                            <Text style={styles.labelsA}>Fecha de Adquisición:</Text>
                            <TextInput style={styles.inputs} placeholder={'Fecha'}
                                value={"01-12-2022"} editable={false}>
                            </TextInput>
                            <Text style={styles.labelsA}>Fecha de Vencimiento:</Text>
                            <TextInput style={styles.inputs} placeholder={'Fecha'}
                                value={"01-12-2023"} editable={false}>
                            </TextInput>
                        </View>
                    </View>
                </View>
                :
                //No existe una suscripcion
                <View style={{ flex: 1, width: "100%", backgroundColor: 'gray', alignContent: 'center', justifyContent: 'center', zIndex: -1 }}>
                    {/* El usuario solicito la pasarela de pago paypal */}
                    {paypal ?
                        <WebView
                            style={styles.container}
                            source={{ uri: 'https://gym-virtual-uthh-10a.web.app' }}
                            onLoadEnd={() => {
                                console.log("cargue")
                            }}
                        /> :
                        <View style={[styles.Container, { marginTop: Constants.statusBarHeight - 50 }]}>


                            <View style={{ width: 350, alignItems: 'center', marginBottom: 15, alignContent: 'center' }}>
                                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Obtenga acceso al contenido completo de Rutinas
                                </Text>
                            </View>
                            <View style={{
                                backgroundColor: '#ffff',
                                borderRightColor: '#D60F0F',
                                borderRightWidth: 5,
                                height: 500,
                                width: 350,
                                marginBottom: 100,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.00,
                                elevation: 24,
                            }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <View style={{
                                        flex: 2,
                                        //  backgroundColor: 'gray' 
                                    }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                            <Image source={Logo} style={{ width: 100, height: 100, marginTop: 35 }} ></Image>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                                            <Text style={{ fontSize: 60, fontWeight: 'bold' }}>$5.18</Text>
                                            <Text style={{ backgroundColor: 'gray', color: '#ffff', height: 20, paddingLeft: 5, paddingRight: 5, borderRadius: 10, marginLeft: 10 }}>Unico pago.</Text>
                                        </View>
                                        <View style={{ flex: 1, marginTop: 10 }}>
                                            <Text style={{ fontSize: 20, marginBottom: 5 }}><Entypo name="check" size={24} color="black" /> Acceso ilimitado a videos Premium.</Text>
                                            <Text style={{ fontSize: 20, marginBottom: 5 }}><Entypo name="check" size={24} color="black" /> Acceso a consejos personalizados.</Text>
                                            <Text style={{ fontSize: 20, marginBottom: 5 }}><Entypo name="check" size={24} color="black" /> Acceso a dietas nutricioanles.</Text>
                                            <Text style={{ fontSize: 20, marginBottom: 5 }}><Entypo name="check" size={24} color="black" /> Asesoria personalizada.</Text>
                                        </View>
                                    </View >
                                    <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                                        {isloading ? < ActivityIndicator size="large" color="#D60F0F" /> : null}
                                        <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => {
                                            setloading(true)
                                            setTimeout(() => {
                                                setpaypal(true)
                                            }, 2500)
                                        }}>
                                            <View style={styles.button}>
                                                <Text style={styles.buttonText}>Obtener plan Premium</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>}
                </View>
            }
            <View style={{ alignItems: 'center', marginBottom: 30, zIndex: 1, marginTop: -100 }}>
                <Btn_Login text={'REGRESAR'} onPress={() => navigation.goBack()} />
            </View>
        </View >
    )
}

export default Pagos

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff',
        borderColor: 'red',
        marginTop: Constants.statusBarHeight - 2,
    },
    container: {
        flex: 1,
        width: "100%",
        height: "100%"
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
    button: {
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 10,
        backgroundColor: '#D60F0F',
        marginTop: 10,
        padding: 30,
        width: 300,
        height: 60,

    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        // textTransform: 'uppercase',
        textAlign: 'center'
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
        marginBottom: 20,
        borderRadius: 5
    },
})
