import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions, ImageBackground, Button, Alert, Image} from 'react-native';
const localimagen = require("./assets/login.png");
import FlatButton from './button';
import Mostrarcon from './button2';

export default function App() {

  return (
    <ImageBackground source={localimagen} style={styles.container}>
      <Text style={styles.titulo}>LOGIN</Text>
      <Text style={styles.subtitulo2}>CORREO ELECTRONICO</Text>
      <TextInput
        placeholder='Email'
        style={styles.TextInput}
      ></TextInput>
      <Text style={styles.subtitulo2}>CONTRASEÑA               </Text>
      <TextInput
        placeholder='Contraseña'
        style={styles.TextInput}
        secureTextEntry={true}
      ></TextInput>
      <Text style={styles.subtitulo}>¿OLVIDASTE CONTRASEÑA?</Text>
      <Mostrarcon/>
      <FlatButton text={'ENVIAR'} onPress={() => Alert.alert('LOGUE EXITOSO!')}/>
      <Text style={styles.subtitulo}>¿AUN NO TIENES UNA CUENTA? REGISTRATE</Text>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 50
  },
  subtitulo:{
    fontSize: 10,
    fontWeight: 'Regular',
    color: '#FFFFFF',
    marginTop: 20,
    
    
  },
  subtitulo2:{
    fontSize: 10,
    fontWeight: 'Regular',
    color: '#FFFFFF',
    marginTop: 20,
    paddingRight: 150,
  
  },
  TextInput:{
    borderWidth: 1,
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 10,
    backgroundColor: '#E8F0FE',
  },
  imgStyles:{
    width: 100,
    height: 100,
    marginTop: 30,
  }
});
