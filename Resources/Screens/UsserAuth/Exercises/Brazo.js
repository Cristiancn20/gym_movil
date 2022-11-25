import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, Button, Text, TextInput, SafeAreaView, BackHandler, Alert, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";

const Locked = require('../../../Images/RN_Locked.png');

const Rutina_Brazo_ = ({ navigation }) => {

    const [buy, setBuy] = useState(false)

    const Item = ({ Name }) => {
        return (
            <View style={styles.Cards}>
                <Text style={styles.Tittle}>{Name}</Text>
                <Text style={styles.Subtitle}>Subtitle Here</Text>
                <View style={styles.Subcard} pointerEvents={!buy ? "none" : "auto"}>
                    <YoutubePlayer
                        height={300}
                        width={400}
                        play={false}
                        videoId={"IHNzOHi8sJs"}
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
        // Alert.alert("Para reproducir el video debes de adquirir una suscripción", [
        Alert.alert("Cerrar Sesión!", "Estas seguro de cerrar Sesión?", [
            {
                text: "COMPRAR", onPress:
                    () => {
                        navigation.navigate('Pago')
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
            Nombre: 'Brazos flats'
        },
        {
            id: '2',
            Nombre: 'Brazos 2'
        },
        {
            id: '3',
            Nombre: 'Brazos 2'
        }

    ]

    //funcion que renderiza los componentes
    const renderItem = ({ item }) => (
        <Item Name={item.Nombre} />
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
        fontSize: 32,
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