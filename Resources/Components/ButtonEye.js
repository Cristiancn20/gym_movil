import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';



const IconShow = (ValueIcon) => {
    return (
        <FontAwesome5 name="eye" size={20} color="black" />
    )
}

export default function Btn_Eye({ navigation }) {
    const [text, setText] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    return (
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <View style={style.button}>
                <Text style={style.buttonText}>
                    <IconShow />
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 80,
        alignContent: 'center',
        backgroundColor: '#D9D9D9',
        marginTop: 10,
        width: 70,
        height: 40,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',

    }
})