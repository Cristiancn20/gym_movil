import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from "react-native";

const Item = ({ title, subtitle, year, description, rute }) => {
    return (
        <View style={styles.Cards}>
            <Text style={styles.Tittle}>{title}</Text>
            <Text style={styles.Subtitle}>{subtitle}</Text>
            <Text style={styles.Anio}>{year}</Text>
            <View style={styles.Subcard}>
                <Image resizeMode={'stretch'}
                    source={{ uri: rute }}
                    style={styles.ImagenNew}></Image>
                <Text style={styles.Description}>{description}.</Text>
            </View>
        </View>
    )
}

const Noticies = () => {

    const [datacard, setdatacard] = useState([])
    const [isloading, setisloading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        showdata()
    }, [])


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        showdata()
        setTimeout(() => {
            setRefreshing(false);
            ToastAndroid.show("Noticias actualizadas!", ToastAndroid.SHORT);
        }, 2000);

    }, []);

    const showdata = () => {
        fetch('https://gymvirtualuthhh.proyectoarp.com/AccesoBD/Noticias/getNews.php', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                setisloading(false)
                setdatacard(data)
            })
            .catch(error => console.error('Error', error))
    }


    //funcion que renderiza los componentes
    const renderItem = ({ item }) => (
        <Item title={item.Titulo}
            subtitle={item.Subtitulo}
            year={item.Anio}
            description={item.Descripcion}
            rute={item.Ruta}
        />
    )


    return (
        <SafeAreaView style={styles.Container}>
            <View style={{ flex: 1, marginTop: 50 }}>
                <Text style={{
                    fontSize: 35, textAlign: 'center'
                }}>NOTICIAS</Text>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2, width: 350, height: 5 }}>
                </View>
            </View>
            <View style={{ flex: 9 }}>
                {isloading ? <ActivityIndicator size="large" /> :
                    <FlatList
                        data={datacard}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor="red"
                                colors={["red", "green"]} />} />}

            </View>
        </SafeAreaView>
    );
}


export default Noticies

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Cards: {
        width: 400,
        height: 480,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 5,
    },
    Subcard: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Tittle: {
        textAlign: 'center',
        fontSize: 30,
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
    ImagenNew: {
        width: '90%',
        height: 250, borderRadius: 5
    },
    Description: {
        fontSize: 15,
        paddingLeft: 20,
        textAlign: 'justify',
        paddingRight: 20
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})
