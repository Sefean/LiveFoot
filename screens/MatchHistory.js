import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

function partidoSeleccionado(idPartido) {
    console.log(idPartido);
}

function PartidoView(props) {

    var background = colors.white;
    var partido = props.item;

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

    var escudoEquipo = cons.apiUrl + '/img/' + partido.escudo;
    var escudoRival = cons.apiUrl + '/img/' + partido.escudo_rival;

    return (
    <TouchableOpacity onPress={ () => partidoSeleccionado(partido.id_partido)}>
        <View style={{padding: 10, height: 150, borderTopWidth: 0.2, backgroundColor: background}}>
            <View style={styles.firstRow}>
                <Text style={styles.cabeceraPartido}>{partido.estadio} | {fecha} | {hora}</Text>
            </View>
            <View style={styles.secondRow}>
                <View style={styles.columnSide}>
                    <View>
                        <Image style={styles.escudo} source={{uri: escudoEquipo}} />
                    </View>
                    <Text style={styles.nombreEquipoTexto}>{partido.nombre}</Text>
                </View>
                <View style={styles.columnCenter}><Text style={styles.resultado}>{partido.goles_local} - {partido.goles_visitante}</Text></View>
                <View style={styles.columnSide}>
                    <View>
                        <Image style={styles.escudo} source={{uri: escudoRival}} />
                    </View>
                    <Text style={styles.nombreEquipoTexto}>{partido.nombre_rival}</Text>
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
    
    //se llama antes de renderizar
    useEffect(() => {
        
        //cambiamos el nombre de la barra
        /*console.log(escudo);
        console.log(idEquipo);
        console.log(nombreEquipo);
        console.log(partidos);*/
    });

    return (
        <SafeAreaView style={styles.equiposView}>
            <ScrollView>
                {partidos.map((prop, key) => {
                    return (
                    <PartidoView key={key} item={prop}/>
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
        fontSize: 20,
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
    escudoContainer:
    {
        flex: 0.25,
        backgroundColor: colors.white,
        padding: 25
    }
});