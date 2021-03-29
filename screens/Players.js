import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

function playerSeleccionado(idPlayer) {
    console.log(idPlayer);
}

function JugadorView(props) {

    var jugador = props.item;
    var fotoJugador = cons.apiUrl + '/img/' + jugador.foto;

    return (
        <TouchableOpacity onPress={ () => playerSeleccionado(jugador.id_jugador)}>
            <View style={{padding: 0, height: 50, borderBottomWidth: 0.3}}>
                <View style={styles.row}>
                    <View style={styles.imgColumn}>
                        <Image style={styles.foto} source={{uri: fotoJugador}} />
                    </View>
                    <View style={styles.textColumn}>
                        <View style={{width: 30}}><Text style={styles.nombre}>{jugador.dorsal}</Text></View>
                        <View style={{width: 20}}><Text style={styles.nombre}>-</Text></View>
                        <View><Text style={styles.nombre}>{jugador.nombre}</Text></View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    );

}

export default function Players({route, navigation}) {
    
    const params = route.params;
    
    const idEquipo = params.idEquipo;
    const jugadores = params.jugadores;
    
    //se llama antes de renderizar
    useEffect(() => {
    });

    return (
        <SafeAreaView style={styles.equiposView}>
            <ScrollView>
                {jugadores.map((prop, key) => {
                    return (
                    <JugadorView key={key} item={prop}/>
                    );
                })}
            </ScrollView>
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    mainContainer: 
    {
      flex: 1,
    },
    row:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center' //centra verticalmente
    },
    textColumn:
    {
        flex: 1,
        flexDirection: 'row',
    },
    nombre:
    {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    foto:
    {   
        flex: 1,
        resizeMode: 'contain',
        width: 75,
        height: 75,
        margin: 5
    }
});