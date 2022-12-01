import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, Button, Text, TextInput, SafeAreaView, BackHandler, Alert, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Locked = require('../../../Images/RN_Locked.png');

const Rutina_Brazo_ = ({ navigation }) => {
    //useState
    const [buy, setBuy] = useState(false)
    const [Pnombre, setNombre] = useState("");
    const [Pemail, setEmail] = useState("");


    //function getdata
    async function getData() {
        const STMembresia = await AsyncStorage.getItem('@Membresia')
        const STName = await AsyncStorage.getItem('@name')
        const STEmail = await AsyncStorage.getItem('@Email')
        setNombre(STName)
        setEmail(STEmail)
        if (STMembresia == null || STMembresia == "FALSE") {
            setBuy(false)
        } else {
            setBuy(true)
        }
    }

    //useEffect
    useEffect(() => {
        getData()
    }, [])


    const Item = ({ Name, YouTubeID }) => {
        return (
            <View style={styles.Cards}>
                <Text style={styles.Tittle}>{Name}</Text>
                <View style={styles.Subcard} pointerEvents={!buy ? "none" : "auto"}>
                    <YoutubePlayer
                        height={300}
                        width={400}
                        play={false}
                        videoId={YouTubeID}
                    />
                </View>
                {!buy ? <View style={{ height: 50, marginTop: -290, zIndex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Notificacion()}>
                        <Image resizeMode={'stretch'} source={Locked} style={{ width: 170, height: 170, borderRadius: 10 }}></Image>
                    </TouchableOpacity>
                </View> : null}
            </View>
        )
    }

    const Notificacion = () => {
        Alert.alert("Contenido Premium", "Para reproducir el video debes de adquirir una suscripción", [
            {
                text: "COMPRAR", onPress:
                    () => {
                        navigation.navigate('Pago', {
                            NameUsser: Pnombre,
                            EmailUsser: Pemail
                        })
                    }
            },
            {
                text: "OK",
                onPress: () => null,
                style: "cancel"
            }
        ]);
    }

    const Data = [
        {
            id: '1',
            Nombre: 'CURL PARA BÍCEPS CON BARRA OLÍMPICA',
            Youtube: 'Ej7782EFCaA'
        },
        {
            id: '2',
            Nombre: 'CURL CON BARRA Z',
            Youtube: 'Q7heKt4r5oI'
        },
        {
            id: '3',
            Nombre: 'CURL CON MANCUERNAS',
            Youtube: 'HEOdWMEeVIg'
        },
        {
            id: '4',
            Nombre: 'CURL DE MARTILLO CON MANCUERNAS',
            Youtube: '_yAKJjaeQgw'
        },
        {
            id: '5',
            Nombre: 'DOMINADAS CON AGARRE',
            Youtube: 'lYsxkUtPwd0'
        }

    ]

    //funcion que renderiza los componentes
    const renderItem = ({ item }) => (
        <Item Name={item.Nombre}
            YouTubeID={item.Youtube} />
    )

    return (
        <SafeAreaView style={styles.Container}>
            <View style={{ flex: 1, marginTop: 50, flexDirection: 'row' }}>
                <View style={{
                    flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', marginTop: 5
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                        // navigation.navigate('ContainerFragment')
                    }}>
                        <Ionicons name="arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={{ fontSize: 35, textAlign: 'center' }}> BRAZO</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={{ flex: 9 }}>
                <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default Rutina_Brazo_

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Cards: {
        width: 400,
        height: 320,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 5,
        zIndex: -1,
        padding: 10
    },
    Subcard: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    Tittle: {
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 10
    },
    Subtitle: {
        textAlign: 'left',
        fontSize: 25,
        paddingLeft: 20
    },
    Anio: {
        fontSize: 18,
        paddingLeft: 20,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    Description: {
        fontSize: 15,
        paddingLeft: 20,
        textAlign: 'justify',
        paddingRight: 20
    },
})
