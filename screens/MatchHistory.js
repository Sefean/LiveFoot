import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button, ScrollView, useColorScheme } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

function partidoSeleccionado(navigation, partido, jugadores, admin) {
    
    if(admin)
    {
        navigation.navigate("AdminMatch", {partido: partido, jugadores: jugadores});
    }
    else
    {
        let apiUrl = cons.apiUrl + "/api.php?action=getNarraciones";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            id_partido: partido.id_partido,
        };

        fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
        .then((response)=>response.text())
        .then((response)=>{
                
            if(response)
            {
                let narraciones = (JSON.parse(response));
                navigation.navigate("PublicMatch", {partido: partido, narraciones: narraciones});
            }
        })
        .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error al obtener narraciones.");})
        
    }
}

function PartidoView(props) {

    let background = colors.white;
    let partido = props.item;
    let navigation = props.navigation;
    let jugadores = props.jugadores;
    let admin = props.admin;

    let fecha = new Date(partido.fecha_hora.substring(0,10));
    
    let day = ("0" + fecha.getDate()).slice(-2);
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2)
    let year = fecha.getFullYear();

    fecha = day + "/" + month + "/" + year;

    let hora = partido.fecha_hora.substring(11,16);
    let enJuego = false;
    if(partido.resultado == "J1" || partido.resultado == "J2" || partido.resultado == "des")
    {
        enJuego = true;
    }
    
    switch (partido.resultado) {
        case "V":
            background = colors.lightgreen;
            break;
        case "E":
            background = colors.blueDraw;
            break;
        case "D":
            background = colors.redLose;
            break;
        default:
            background = colors.white;
            break;
    }

    var escudoEquipo = props.escudo;
    var escudoRival = cons.apiUrl + '/img/' + partido.escudo_rival;

    var nombreLocal = props.nombre;
    var nombreVisitante = partido.nombre_rival;
    var escudoLocal = escudoEquipo;
    var escudoVisitante = escudoRival;

    if(partido.local == 0)
    {
        nombreLocal = partido.nombre_rival;
        nombreVisitante = props.nombre;
        escudoLocal = escudoRival;
        escudoVisitante = escudoEquipo;
    }

    return (
    <TouchableOpacity onPress={ () => partidoSeleccionado(navigation, partido, jugadores, admin)}>
        <View style={{padding: 10, height: 150, borderTopWidth: 0.2, backgroundColor: background}}>
            <View style={styles.firstRow}>
                <Text style={styles.cabeceraPartido}>{partido.estadio} | {fecha} | {hora}</Text>
            </View>
            <View style={styles.secondRow}>

                <View style={styles.columnSide}>
                    <View>
                        <Image style={styles.escudo} source={{uri: escudoLocal}} />
                    </View>
                    <Text style={styles.nombreEquipoTexto}>{nombreLocal}</Text>
                </View>
                
                <View style={styles.columnCenter}><Text style={styles.resultado}>{partido.goles_local} - {partido.goles_visitante}</Text></View>
                
                <View style={styles.columnSide}>
                    <View>
                        <Image style={styles.escudo} source={{uri: escudoVisitante}} />
                    </View>
                    <Text style={styles.nombreEquipoTexto}>{nombreVisitante}</Text>
                </View>
                
            </View>
            {enJuego == true && <Text style={styles.enJuego}>En juego</Text> }
        </View>
    </TouchableOpacity>);
}

export default function MatchHistory({route, navigation}) {

    const params = route.params;
    const escudo = params.escudo;
    const idEquipo = params.idEquipo;
    const nombreEquipo = params.nombreEquipo;
    const partidos = params.partidos;
    const jugadores = params.jugadores;
    const admin = params.admin;
    
    return (
        <SafeAreaView style={styles.equiposView}>
            <ScrollView>
                {partidos.map((prop, key) => {
                    return (
                    <PartidoView key={key} item={prop} escudo={escudo} nombre={nombreEquipo} navigation={navigation} jugadores={jugadores} admin={admin}/>
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
    firstRow:
    {
        flex: 1,
        alignSelf: 'center'
    },
    secondRow:
    {
        flex: 1,
        flexDirection: "row",
        alignSelf: 'center',
        alignItems: 'center'
    },
    columnSide:
    {
        flex: 0.35,
        alignItems: 'center'
    },
    columnCenter:
    {
        flex: 0.3,
        alignItems: 'center',
    },
    cabeceraPartido:
    {
        fontSize: 20,
        fontWeight: 'bold',
    },
    resultado:
    {
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    nombreEquipoTexto:
    {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 20       
    },
    escudo:
    {   
        flex: 1,
        resizeMode: 'contain',
        width: 75,
        height: 75,
        margin: 5
    },
    enJuego:
    {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
        color: "#FF0000"
    }
});