import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function Btn_Login({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 10,
        backgroundColor: '#D60F0F',
        marginTop: 10,
        padding: 30,
        width: 200,
        height: 60,

    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})
