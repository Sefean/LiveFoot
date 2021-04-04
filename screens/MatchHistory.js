import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

function partidoSeleccionado(navigation, partido) {
    navigation.navigate("AdminMatch", {partido: partido})
}

function PartidoView(props) {

    var background = colors.white;
    var partido = props.item;
    var navigation = props.navigation;

    var fecha = new Date(partido.fecha_hora.substring(0,10));
    
    let day = ("0" + fecha.getDate()).slice(-2);
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2)
    let year = fecha.getFullYear();

    fecha = day + "/" + month + "/" + year;

    var hora = partido.fecha_hora.substring(11,16);
    
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
    <TouchableOpacity onPress={ () => partidoSeleccionado(navigation, partido)}>
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
        </View>
    </TouchableOpacity>);
}

export default function MatchHistory({route, navigation}) {

    const params = route.params;
    const escudo = params.escudo;
    const idEquipo = params.idEquipo;
    const nombreEquipo = params.nombreEquipo;
    const partidos = params.partidos;
    
    return (
        <SafeAreaView style={styles.equiposView}>
            <ScrollView>
                {partidos.map((prop, key) => {
                    return (
                    <PartidoView key={key} item={prop} escudo={escudo} nombre={nombreEquipo} navigation={navigation}/>
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
        fontSize: 50,
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
    }
});