import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

function playerSeleccionado(idEquipo, foto, nombre, dorsal, navigation, admin) {

    if(admin)
    {
        navigation.navigate('EditPlayer', {foto: foto, nombre: nombre, dorsal: dorsal})
    }
    else
    {
        let apiUrl = cons.apiUrl + "/api.php?action=getNombreEquipo";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            id_equipo: idEquipo,
        };

        fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
        .then((response)=>response.text())
        .then((response)=>{
                
            if(response)
            {
                let respuesta = JSON.parse(response);
                let nombreEquipo = respuesta.nombreEquipo;
                let nombreClub = respuesta.nombreClub;
                
                navigation.navigate('ViewPlayer', {foto: foto, nombre: nombre, dorsal: dorsal, nombreEquipo: nombreEquipo, nombreClub: nombreClub})
            }
        })
        .catch((error)=>{
            console.log(error.message);
            console.log("Error", "Error al intentar obtener información del jugador.");
        });
    }

}

function JugadorView(props) {

    let jugador = props.item;
    let navigation = props.navigation;
    let admin = props.admin;
    let idEquipo = props.idEquipo;
    let fotoJugador = cons.apiUrl + '/img/' + jugador.foto;

    return (
        <TouchableOpacity onPress={ () => playerSeleccionado(idEquipo, fotoJugador, jugador.nombre, jugador.dorsal, navigation, admin)}>
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
    const admin = params.admin;

    return (
        <SafeAreaView style={styles.equiposView}>
            <ScrollView>
                {jugadores.map((prop, key) => {
                    return (
                    <JugadorView key={key} item={prop} navigation={navigation} idEquipo={idEquipo} admin={admin}/>
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