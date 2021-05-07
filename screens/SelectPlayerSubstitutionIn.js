import React, {useEffect} from 'react';
import { TouchableHighlight } from 'react-native';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button, ScrollView } from 'react-native';
import { Icon } from "react-native-elements";
import { useState } from 'react/cjs/react.development';
import Toast from 'react-native-simple-toast';
import { RadioButton } from 'react-native-paper';

import colors from '../config/colors';
import cons from '../config/cons';

function playerSeleccionado(idPlayer) {
    console.log(idPlayer);
}

function JugadorView(props) {

    var jugador = props.item;
    var fotoJugador = cons.apiUrl + '/img/' + jugador.foto;

    const parentfunction = (jugador) =>
    {
        props.functionToPass(jugador);
    }

    return (
        <TouchableOpacity onPress={ () => parentfunction(jugador)}>
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

export default function SelectPlayerSubstitutionIn({route, navigation}) {
    
    const params = route.params;

    const [comentario, setComentario] = useState("Entra al campo ");

    const [jugadorEntraId, setJugadorEntraId] = useState(0);
    const [jugadorEntraNombre, setJugadorEntraNombre] = useState(0);

    const selectPlayerIn = (jugador) =>
    {
        setComentario("Entra al campo " + jugador.nombre)
        setJugadorEntraId(jugador.id_jugador);
        setJugadorEntraNombre(jugador.nombre);
    }

    const nextScreen = () =>
    {
        navigation.navigate("SelectPlayerSubstitutionOut", {jugadores: jugadores, partido: partido, jugadorEntraId: jugadorEntraId, jugadorEntraNombre: jugadorEntraNombre});        
    }
    
    const jugadores = params.jugadores;
    const partido = params.partido;

    return (
        <SafeAreaView style={styles.equiposView}>
            <ScrollView style={styles.scroll}>
                {jugadores.map((prop, key) => {
                    return (
                    <JugadorView key={key} item={prop} functionToPass={selectPlayerIn}/>
                    );
                })}
                
            </ScrollView>
            <View style={styles.secondContainer}>
                <TextInput
                    style={styles.comentario}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={"Comentario"}
                    value={comentario}
                    onChangeText={text => setComentario(text)}/>
                <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={nextScreen} style={styles.buttons} underlayColor={colors.lightgreen}>    
                    <View><Text style={styles.textButton}>ELEGIR JUGADOR QUE SALE DEL CAMPO</Text></View>
                </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    equiposView: 
    {
      flex: 1,
    },
    firstContainer:
    {
        flex: 0.2,
        borderBottomWidth: 0.3,
    },
    scroll:
    {
        flex: 0.6,
    },
    secondContainer:
    {
        flex: 0.2
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
    },
    comentario:
    {
        flex: 1,
        borderColor: colors.darkgreen,
        borderWidth: 2,
        borderBottomWidth: 0,
        paddingLeft: 10
    },
    buttonContainer:
    {
        flexGrow: 1,
    },
    buttons:
    {   flex: 1,
        flexGrow: 1,
        backgroundColor: colors.mediumgreen,
        borderColor: colors.darkgreen,
        borderTopWidth: 3,
        alignItems:'center',
        justifyContent:'center',
    },
    textButton: 
    {
      fontSize: 16,
      fontWeight: 'bold',
    },
    radioContainer:
    {
        flex: 1,
        flexDirection: 'row'
    },
    columnRadio:
    {
        flex: 1,
        alignItems: 'center',
        marginBottom: 30
    },
    textRadio:
    {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    }
});