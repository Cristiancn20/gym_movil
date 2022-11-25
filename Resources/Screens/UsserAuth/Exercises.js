import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Alert, SafeAreaView, ScrollView, Button, TouchableOpacity, FlatList } from "react-native";

export default function Ejercicios({ navigation }) {

    function GotoScreen(key) {
        switch (key) {
            case 1:
                navigation.navigate('Rutina_Brazo')
                break;
            case 2:
                navigation.navigate('Rutina_Pecho')
                break;
            case 3:
                navigation.navigate('Rutina_Hombro')
                break;
            case 4:
                navigation.navigate('Rutina_Pierna')
                break;

            default:
                break;
        }
    }
    
    const Data = [
        {
            id: "1",
            Rutina: "BRAZOS",
            Tipo: 1,
            Ruta: 'https://gymvirtualuthhh.proyectoarp.com/AccesoBD/ImgEjercicios/Brazo.png'
        }, {
            id: "2",
            Rutina: "PECHO",
            Tipo: 2,
            Ruta: 'https://gymvirtualuthhh.proyectoarp.com/AccesoBD/ImgEjercicios/Pecho.jpeg'

        }, {
            id: "3",
            Rutina: "HOMBRO",
            Tipo: 3,
            Ruta: 'https://gymvirtualuthhh.proyectoarp.com/AccesoBD/ImgEjercicios/Hombro.jpeg'
        }, {
            id: "4",
            Rutina: "PIERNA",
            Tipo: 4,
            Ruta: 'https://gymvirtualuthhh.proyectoarp.com/AccesoBD/ImgEjercicios/Pierna.jpg'
        }
    ]

    useEffect(() => {
    }, [])

    const Item = ({ Rutine, Rute, Tipe }) => {
        return (
            <View style={styles.Cards}>
                <Text style={styles.Tittle}>{Rutine}</Text>
                <Image source={{ uri: Rute }} resizeMode={'stretch'} style={{ width: "100%", height: 200 }}>
                </Image>
                <TouchableOpacity style={{ backgroundColor: '#23272B', paddingLeft: 25, paddingRight: 25, height: 50, alignContent: 'center', justifyContent: 'center' }}
                    onPress={() => GotoScreen(Tipe)}>
                    <Text style={{ color: 'white', fontSize: 25 }}>{Rutine}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //funcion que renderiza los componentes
    const renderItem = ({ item }) => (
        <Item
            Rutine={item.Rutina}
            Tipe={item.Tipo}
            Rute={item.Ruta}
        />
    )

    return (
        <SafeAreaView style={styles.Container}>
            <View style={{ flex: 1, marginTop: 50 }}>
                <Text style={{
                    fontSize: 35, textAlign: 'center'
                }}>EJERCICIOS</Text>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2, width: 350, height: 5 }}>
                </View>
            </View>
            <View style={{ flex: 9 }}>
                <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView >
    );
}



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
        padding: 5
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



// {/* <YoutubePlayer
//                     height={400}
//                     width={500}
//                     play={playing}
//                     videoId={"iee2TATGMyI"}
//                     onChangeState={onStateChange}
//                 />
//                 <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}





// {/* <Image resizeMode={'stretch'}
//                                 source={{ uri: 'https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/ImgNews/Nivel_3_A.png' }}
//                                 style={styles.ImagenNew}></Image> */}


// // const imgPecho = require('../../Images/RN_Pecho.jpg')
// // const imgHombro = require('../../Images/RN_Hombro.jpg')
// // const imgPierna = require('../../Images/RN_Pierna.jpg')
// // const imgEspalda = require('../../Images/RN_Espalda.jpg')

// // const Exercises = () => {
// //     return (
    // //         <SafeAreaView style={[styles.Container, { flexDirection: 'column' }]}>
// //             <WebView
// //                 style={{ width: 400, height: 400, marginTop: 50 }}
// //                 source={{ uri: 'https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/Noticias.php' }}
// //             />
// //             {/* <View style={{ height: 50, marginTop: 50 }}>
// //                 <Text style={styles.StyleText}>EJERCICIOS</Text>
// //             </View> */}

// //             {/* <View style={{ flex: 9, width: '100%' }}>
// //                 <ScrollView style={{ flex: 1 }}>
// //                     <View style={styles.ContainerSections}>
// //                         <Text style={{ fontSize: 30 }}>Pecho</Text>
// //                         <Image resizeMode={'stretch'} source={imgPecho} style={{ width: "100%", height: 250, borderRadius: 10 }}></Image>
// //                     </View>
// //                     <View style={styles.ContainerSections}>
// //                         <Text style={{ fontSize: 30 }}>Hombro</Text>
// //                         <Image resizeMode={'stretch'} source={imgHombro} style={{ width: "100%", height: 250, borderRadius: 10 }}></Image>
// //                     </View>
// //                     <View style={styles.ContainerSections}>
// //                         <Text style={{ fontSize: 30 }}>Pierna</Text>
// //                         <Image resizeMode={'stretch'} source={imgPierna} style={{ width: "100%", height: 250, borderRadius: 10 }}></Image>
// //                     </View>
// //                     <View style={styles.ContainerSections}>
// //                         <Text style={{ fontSize: 30 }}>Espalda</Text>
// //                         <Image resizeMode={'stretch'} source={imgEspalda} style={{ width: "100%", height: 250, borderRadius: 10 }}></Image>
// //                     </View>

// //                     <View style={styles.ContainerSections}>
// //                         <Text style={{ fontSize: 20 }} onPress={() => {
    // //                             Alert.alert("Se necesita realizar un pago para acceder a más contenido");
// //                         }}>Más rutinas proximamente...</Text>
// //                     </View>


// //                 </ScrollView>
// //             </View> */}
// //         </SafeAreaView>
// //     )
// // }


// // export default Exercises

// import React, { useState, useCallback, useRef } from "react";
// import { Button, View, Alert, ScrollView } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";

// export default function App() {
//     const [playing, setPlaying] = useState(false);

//     const onStateChange = useCallback((state) => {
//         if (state === "ended") {
//             setPlaying(false);
//             Alert.alert("video has finished playing!");
//         }
//     }, []);

//     const togglePlaying = useCallback(() => {
//         setPlaying((prev) => !prev);
//     }, []);

//     return (
//         <View>
//             <View>
//                 <ScrollView>
//                     <View>
//                         <YoutubePlayer
//                             height={300}
//                             play={playing}
//                             videoId={"iee2TATGMyI"}
//                             onChangeState={onStateChange}
//                         />
//                         <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
//                     </View>
//                     <View>
//                         <YoutubePlayer
//                             height={300}
//                             play={playing}
//                             videoId={"iee2TATGMyI"}
//                             onChangeState={onStateChange}
//                         />
//                         <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
//                     </View>
//                     <View>
//                         <YoutubePlayer
//                             height={300}
//                             play={playing}
//                             videoId={"iee2TATGMyI"}
//                             onChangeState={onStateChange}
//                         />
//                         <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
//                     </View>
//                 </ScrollView>
//             </View>
//         </View>

//     );
// }