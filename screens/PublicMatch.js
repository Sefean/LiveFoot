import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import {StyleSheet, Text, TextInput, Alert, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";
import { useState } from 'react/cjs/react.development';
import Toast from 'react-native-simple-toast';
import { CountUp } from 'use-count-up';

import colors from '../config/colors';
import cons from '../config/cons';

import { LogBox } from 'react-native';

function CabeceraView(props)
{
    let partido = props.partido;

    let golesLocal = props.golesLocal;
    let golesVisitante = props.golesVisitante;

    let fecha = new Date(partido.fecha_hora.substring(0,10));
    
    let day = ("0" + fecha.getDate()).slice(-2);
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2)
    let year = fecha.getFullYear();

    fecha = day + "/" + month + "/" + year;

    let hora = partido.fecha_hora.substring(11,16);

    let escudoEquipo = cons.apiUrl + '/img/' + partido.escudo;;
    let escudoRival = cons.apiUrl + '/img/' + partido.escudo_rival;

    let nombreLocal = partido.nombre;
    let nombreVisitante = partido.nombre_rival;
    let escudoLocal = escudoEquipo;
    let escudoVisitante = escudoRival;

    if(partido.local == 0)
    {
        nombreLocal = partido.nombre_rival;
        nombreVisitante = partido.nombre;
        escudoLocal = escudoRival;
        escudoVisitante = escudoEquipo;
    }

    return (
        
        <View style={{height: 100}}>
        
            <View style={styles.secondRow}>

                <View style={styles.columnSide}>
                    <View>
                        <Image style={styles.escudo} source={{uri: escudoLocal}} />
                    </View>
                    <Text style={styles.nombreEquipoTexto}>{nombreLocal}</Text>
                </View>
                
                <View style={styles.columnCenter}>
                    <Text style={styles.resultado}>{golesLocal} - {golesVisitante}</Text>
                </View>
                
                <View style={styles.columnSide}>
                    <View>
                        <Image style={styles.escudo} source={{uri: escudoVisitante}} />
                    </View>
                    <Text style={styles.nombreEquipoTexto}>{nombreVisitante}</Text>
                </View>
            </View>
        </View>
        );
}

function renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        
        }}
      />
    );
  }

export default function PublicMatch({route, navigation}) {
    
    const params = route.params;
    const partido = params.partido;
    const narraciones = params.narraciones;

    //general
    const [minutoActual, setMinutoActual] = useState(partido.minuto_actual);

    //goles
    const [golesLocal, setGolesLocal] = useState(partido.goles_local);
    const [golesVisitante, setGolesVisitante] = useState(partido.goles_visitante);

    //actualizar narracion
    const [refreshing, setRefreshing] = useState(false);


    //para que warnings no salgan en pantalla
    LogBox.ignoreAllLogs();

    //llama a la base de datos y obtiene todas las narraciones
    const actualizar = () =>
    {        
        let minuto, goles_l, goles_v, narraciones;
        
        let apiUrl = cons.apiUrl + "/api.php?action=actualizarNarracion";
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
                let respuesta = JSON.parse(response);
                console.log(respuesta);
                minuto = respuesta.minuto_actual;
                goles_l = respuesta.goles_local;
                goles_v = respuesta.goles_visitante;

                apiUrl = cons.apiUrl + "/api.php?action=getNarraciones";

                fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
                .then((response)=>response.text())
                .then((response)=>{
                    
                if(response)
                {
                    setGolesLocal(goles_l);
                    setGolesVisitante(goles_v);
                    setMinutoActual(minuto);

                    console.log(JSON.parse(response));
                }})

            .catch((error)=>{console.log(error.message);Toast.show("Error", "Error al obtener las narraciones.");})
            }
        })
        .catch((error)=>{console.log(error.message);Toast.show("Error", "Error al intentar actualizar el resultado.");})
    }

    useEffect(() => 
    {    
        //cambiamos el nombre de la barra       
        var titulo = partido.nombre + " - " + partido.nombre_rival;
        if(partido.local == 0)
        {
            titulo = partido.nombre_rival + " - " + partido.nombre;
        }

        navigation.setOptions({ title: titulo});
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.firstContainer}>
                <Text style={styles.tiempo}>{minutoActual}</Text>
                <CabeceraView partido={partido} golesLocal={golesLocal} golesVisitante={golesVisitante}/>
                
                <TouchableOpacity style={styles.buttons} onPress={ () => actualizar()}>
                    <Text style={styles.buttonText}>ACTUALIZAR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.secondContainer}>
                <FlatList
                        data={narraciones}
                        ItemSeparatorComponent={renderSeparator}
                        renderItem={({item}) => 
                        (        
                            <View style={styles.narracionView}>
                                <Text style={styles.narracionMinuto}>{item.minuto < 10 ? "0" : ""}{item.minuto}'</Text>
                                {(item.icono != "yellow-card.png" && item.icono != "yellow-card-2.png" && item.icono != "red-card.png") ?
                                <Icon style={styles.narracionIcono} size={30} name={item.icono}></Icon> :
                                <Image style={styles.imgTarjeta} source={{uri: cons.apiUrl + '/img/' + item.icono}}/>}
                                <Text style={styles.narracionText}>{item.comentario}</Text>
                            </View>
                        )}keyExtractor={(item, index) => index.toString()}
                    />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: 
    {
      flex: 1,
    },
    firstContainer:
    {
        flex: 0.35,
        backgroundColor: colors.white,
    },
    secondContainer:
    {
        flex: 0.65,
        borderTopColor: colors.greyWhite,
        borderWidth: 1
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
        paddingBottom: 30
    },
    tiempo:
    {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nombreEquipoTexto:
    {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 20       
    },
    tiempoTexto:
    {
        fontSize: 20,
        fontWeight: 'bold'
    },
    escudo:
    {   
        resizeMode: 'contain',
        width: 75,
        height: 75,
        margin: 10,
    },
    containerBotonera:
    {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    botoneraRight:
    {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 20
    },
    botoneraLeft:
    {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 20
    },
    touchable:
    {
        flex: 1,
        paddingTop: 25,
        paddingBottom: 25,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 25,        
        backgroundColor: colors.greyWhite,
        width: 140,
    },
    buttonText: {        
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold' 
    },
    image: 
    {
        alignSelf: 'center',
        width: 50,
        height: 50,
        flex: 1
    },
    buttons:
    {
        backgroundColor: colors.mediumgreen,
        borderColor: colors.darkgreen,
        borderWidth: 3,
        borderRadius: 25,
        alignSelf: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: "5%"
    },
    textoFin:
    {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    narracionView: {
        flex: 1,
        minHeight: 50,
        flexDirection: "row",
        padding: 10,
        marginRight: 20
    },
    narracionMinuto: {        
        fontSize: 20,
        margin: 10
    },
    narracionIcono: {        
        fontSize: 20,
        margin: 10,
    },
    narracionText: {        
        fontSize: 20,
        margin: 10,
        paddingEnd: 70
    },
    imgTarjeta:
    {
        resizeMode: 'contain',
        height: 30,
        width: 30,
        margin: 10
    }
  });