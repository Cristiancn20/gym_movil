import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, Text, TextInput, SafeAreaView, Image, TouchableHighlight, ToastAndroid, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Btn_Login from "../../Components/Buttons";
import * as ImagePicker from 'expo-image-picker';

const ImgPerfil = require('../../Images/RN_EmptyUsser.png');

const Perfil = ({navigation}) => {

    //SetState
    const [Pnombre, setNombre] = useState("");
    const [Pussername, setUssername] = useState("");
    const [Pemail, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [edit, setEdit] = useState(false);
    const [ExistImg, setExistImg] = useState(false)

    //cargar datos al iniciar el componente
    useEffect(() => {
        StorageA()
        setTimeout(function () {
            GetImg()
        }, 500)
    }, [])


    /*---------
    |Functions |
    ----------*/
    const StorageA = async () => {
        const STName = await AsyncStorage.getItem('@name')
        const STUsser = await AsyncStorage.getItem('@Usser')
        const STEmail = await AsyncStorage.getItem('@Email')
        setNombre(STName)
        setUssername(STUsser)
        setEmail(STEmail)
    }

    //FUNCION DE PRUEBA 
    const GetImg = async () => {
        const STRuta = await AsyncStorage.getItem('@ruta')
        if (STRuta == "N/A") {
            console.log("no hay imagen, estableciendo la imagen por defecto")
        } else {
            setExistImg(true)
            setImage(null)
            setImage(STRuta)
        }
    }

    //saveTemimage
    const SaveTempImage = async (item) => {
        await AsyncStorage.setItem('@imgtem', item)
    }

    //Obtener imagen 
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });
        if (!result.cancelled) {
            Alert.alert(
                "Imagen de Perfil",
                "¿Cambiar foto de perfil?",
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                        },
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            console.log("mi img actual es: " + result.uri)
                            SaveTempImage(result.uri)
                            setTimeout(function () {
                                savedat()
                                console.log("Paso el segundo")
                            }, 1000)
                            ToastAndroid.show("Cambiando foto de perfil...", ToastAndroid.LONG)
                        }
                    }
                ]
            )
        }

    };


    const savedat = async () => {
        const STImageTemporal = await AsyncStorage.getItem('@imgtem')
        let filename = STImageTemporal.split('/').pop()
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`
        let formData = new FormData();
        formData.append('photo', { uri: STImageTemporal, name: filename, type })
        formData.append('email', Pemail)

        fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Upload.php', {
            method: 'POST',
            body: formData,
            header: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
                if (response.status == 1) {
                    ToastAndroid.show("Se cambio la foto de perfil !", ToastAndroid.LONG);
                    setExistImg(true)
                    setImage(STImageTemporal)
                }
                else {
                    ToastAndroid.show("No se ha podido guardar la imágen, intentelo de nuevo !", ToastAndroid.LONG);
                }
            })
    }


    //return componentes
    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.Container}>
                <View style={{ width: 20, alignItems: 'center' }}>
                    {!ExistImg ? <Image source={ImgPerfil} style={{ width: 200, height: 200, borderRadius: 200 / 2 }}></Image> : <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 200 / 2 }}></Image>}
                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'flex-end', marginRight: 60, marginTop: -60 }}>
                        <TouchableHighlight onPress={() => pickImage()}>
                            <View style={{
                                backgroundColor: 'white', width: 60, height: 60, borderRadius: 70 / 2,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <FontAwesome name="camera" size={24} color="black" />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ marginTop: 100 }}>
                    <Text style={styles.labelsA}>NOMBRE</Text>
                    <TextInput style={styles.inputs} placeholder={'Nombre'}
                        defaultValue={Pnombre}
                        onChangeText={val => setNombre(val)}
                        editable={edit}>
                    </TextInput>
                    <Text style={styles.labelsA}>USERNAME</Text>
                    <TextInput style={styles.inputs} placeholder={'Nombre de usuario'}
                        value={Pussername}
                        onChangeText={val => setUssername(val)}
                        editable={edit}>
                    </TextInput>
                    <Text style={styles.labelsA}>CORREO ELECTRONICO</Text>
                    <TextInput style={styles.inputs} placeholder={'Correo electronico'}
                        value={Pemail}
                        onChangeText={val => setEmail(val)}
                        editable={edit}>
                    </TextInput>
                </View>
                <View>
                    <Btn_Login text={'MEMBRESIA'} onPress={() => { navigation.navigate('Pago') }} />
                </View>
            </View>
            <StatusBar style='light' backgroundColor='#0A130E' />
        </SafeAreaView>
    )
}

export default Perfil

/*------
|Styles|
------*/

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(220, 220, 220)'
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

