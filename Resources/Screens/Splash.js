import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const imgLogo = require('../Images/RN_LogoApp.png');

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ExisSession: false
        }
    }
    // this.setState({ isHungry: false });
    componentDidMount() {
        setTimeout(() => {
            (async () => {
                try {
                    const STName = await AsyncStorage.getItem('@name')
                    if (STName == null || STName == "" || STName == "undefined") {
                        console.log("No existe una session")
                        this.props.navigation.navigate('Login')
                    } else {
                        console.log("Si existe una session")
                        this.props.navigation.navigate('ContainerFragment')
                    }
                } catch (error) {
                    Alert.alert("Error: " + error)
                }
            })()

        }, 3000)
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View >
                    <Image source={imgLogo} />
                </View>
                <Lottie style={{ marginTop: 250 }} source={require('../Animations/load.json')} autoPlay loop />
                <StatusBar style='light' backgroundColor='#0A130E' />
            </SafeAreaView>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(220, 220, 220)'
    }
})
