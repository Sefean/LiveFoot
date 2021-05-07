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

export default function SelectPlayerCarded({route, navigation}) {
    
    const params = route.params;

    const [comentario, setComentario] = useState("Tarjeta amarilla");
    const [amonestado, setAmonestado] = useState(0);
    const [tipoTarjeta, setTipoTarjeta] = useState(3); //3 = amarilla, 4 = 2amarilla, 5 = roja

    const addJugadorToComment = (jugador) =>
    {
        let aux_comentario = "Tarjeta amarilla a ";
        switch (tipoTarjeta) {
            case 3: 
                aux_comentario = "Tarjeta amarilla a ";
            break;
            case 4:
                aux_comentario = "Segunda amarilla a ";
                break;
            case 5:
                aux_comentario = "Tarjeta roja a ";
            break;
        }
        setComentario(aux_comentario + jugador.nombre);
        setAmonestado(jugador.id_jugador);
    }

    const sendComment = () =>
    {
        let apiUrl = cons.apiUrl + "/api.php?action=insertarNarracion";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            id_partido: partido.id_partido,
            id_tipo: tipoTarjeta, //3 = amarilla, 4 = 2amarilla, 5 = roja
            comentario: comentario,
            minuto: partido.minuto_actual,
            id_jugador1: amonestado
        };

        fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
        .then((response)=>response.text())
        .then((response)=>{
                
            if(response)
            {
                Toast.show(response);
                //volvemos a la pantalla anterior
                navigation.goBack();
            }
        })
        .catch((error)=>{
            console.log(error.message);
            console.log("Error", "Error al intentar añadir la narración a la base de datos.");
        });
        
    }
    
    const jugadores = params.jugadores;
    const partido = params.partido;

    return (
        <SafeAreaView style={styles.equiposView}>
            <View style={styles.firstContainer}>
                <View style={styles.radioContainer}>
                  <View style={styles.columnRadio}>
                      <RadioButton value="first" color={colors.mediumgreen} status={ tipoTarjeta === 3 ? 'checked' : 'unchecked' } onPress={() => setTipoTarjeta(3)}/>
                      <Image style={styles.imgTarjeta} source={require("../assets/yellow-card.png")}/>
                  </View>

                  <View style={styles.columnRadio}>
                      <RadioButton value="first" color={colors.mediumgreen} status={ tipoTarjeta === 4 ? 'checked' : 'unchecked' } onPress={() => setTipoTarjeta(4)}/>
                      <Image style={styles.imgTarjeta} source={require("../assets/yellow-card-2.png")}/>
                  </View>

                  <View style={styles.columnRadio}>
                      <RadioButton value="first" color={colors.mediumgreen} status={ tipoTarjeta === 5 ? 'checked' : 'unchecked' } onPress={() => setTipoTarjeta(5)}/>
                      <Image style={styles.imgTarjeta} source={require("../assets/red-card.png")}/>
                  </View>
              </View>
            </View>
            <ScrollView style={styles.scroll}>
                {jugadores.map((prop, key) => {
                    return (
                    <JugadorView key={key} item={prop} functionToPass={addJugadorToComment}/>
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
                <TouchableHighlight onPress={sendComment} style={styles.buttons} underlayColor={colors.lightgreen}>    
                    <View><Text style={styles.textButton}>GUARDAR</Text></View>
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
    imgTarjeta:
    {
        flex: 1,
        resizeMode: 'contain',
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
    {
        flex: 1,
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
        flexDirection: 'row',
        marginTop: 10
    },
    columnRadio:
    {
        flex: 1,
        alignItems: 'center',
        marginBottom: 5
    },
    textRadio:
    {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    }
});