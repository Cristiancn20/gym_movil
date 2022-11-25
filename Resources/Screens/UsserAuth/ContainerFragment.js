import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import MainTabs from '../../Navigations/MainTabs';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Caja({navigation }) {

    // delete session
    const DeleteSession = async () => {
        try {
            await AsyncStorage.removeItem('@name')
            await AsyncStorage.removeItem('@Usser')
            await AsyncStorage.removeItem('@Email')
            await AsyncStorage.removeItem('@ruta')
            await AsyncStorage.removeItem('@imgtem')
            console.log("Data eliminada")
        } catch (error) {
            Alert.alert("ocurrio un error: " + error)
        }
    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Cerrar Sesión!", "Estas seguro de cerrar Sesión?", [
                {
                    text: "CANCELAR",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "OK", onPress:
                        () => {
                            navigation.navigate('Login', {data: null})
                            // navigation.goBack()
                            DeleteSession()
                        }
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <MainTabs />
    )
}

