import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function Mostrarcon({text}){
    return(
        <TouchableOpacity>
            <View style={style.button}>
                <Text style={style.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        borderRadius: 80, 
        paddingVertical: 14, 
        paddingHorizontal: 10,
        backgroundColor: '#D9D9D9',
        marginTop: 20,
        padding: 30,
        width: 50,
        height: 35,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})