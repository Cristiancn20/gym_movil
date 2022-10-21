import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import Lottie from 'lottie-react-native';

const imgLogo = require('../Images/RN_LogoApp.png');

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
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
