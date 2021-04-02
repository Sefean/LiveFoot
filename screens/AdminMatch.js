import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";
import { useState } from 'react/cjs/react.development';

import colors from '../config/colors';
import cons from '../config/cons';

function buttonPressed(action)
{
    console.log(action);
}

function ButtonAction(props)
{
    let action = props.action;
    let icon = "sports-volleyball";
    let iconColor = "black";

    switch (action) {
        case 'ANULADO':
            icon = "remove-circle";
            break;
        case 'CAMBIO':
            icon = "compare-arrows";
            break;
        case 'AMARILLA':
            iconColor = "black";
            icon = "style";
            break;
        case 'ROJA':
            iconColor = "red";
            icon = "crop-portrait";
            break;
        case 'COMENTARIO':
            icon = "mode-comment"
            break;
        default:
            break;
    }
    return (
        <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed(action)}>
            <Icon size={60} color={iconColor} name={icon}></Icon>
            <Text style={styles.buttonText}>{action}</Text>
        </TouchableOpacity>);
}

function CabeceraView(props)
{
    let partido = props.partido;

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
        
        <View style={{height: 150}}>
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
                
                <View style={styles.columnCenter}>
                    <Text style={styles.tiempoTexto}>{props.time}</Text>
                    <Text style={styles.resultado}>{partido.goles_local} - {partido.goles_visitante}</Text>
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

export default function AdminMatch({route, navigation}) {
    
    const params = route.params;
    const partido = params.partido;

    const [timerCount, setTimer] = useState(partido.minutos_partido);
    const [starTimer, setStart] = useState(false);

    const iniciarTimer = () =>
    {
        setStart(true);
    }

    useEffect(() => {

        //cambiamos el nombre de la barra       
        var titulo = partido.nombre + " - " + partido.nombre_rival;
        if(partido.local == 0)
        {
            titulo = partido.nombre_rival + " - " + partido.nombre;
        }

        navigation.setOptions({ title: titulo});

        //timer
        
        if(timerCount > partido.minutos_partido/2)
        {
            let interval = setInterval(() => {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                })
            }, 100) //1000*60
            //cleanup the interval on complete
            return () => {clearInterval(interval)}
        }

        
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.firstContainer}>
                <CabeceraView partido={partido} time={timerCount}/>
            </View>

            <View style={styles.secondContainer}>
                <ScrollView>
                    <View style={styles.containerBotonera}>
                        <View style={[styles.botonera,  {paddingRight: 40}]}>
                            <ButtonAction action={"GOL"}/>
                            <ButtonAction action={"ANULADO"}/>
                            <ButtonAction action={"CAMBIO"}/>
                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("TARJETA")}>
                                <Image 
                                    style={styles.image}
                                    resizeMode={'contain'}
                                    source={require("../assets/penalty-card.png")}/>
                                <Text style={styles.buttonText}>TARJETA</Text>
                            </TouchableOpacity>                        
                            <ButtonAction action={"COMENTARIO"}/>
                        </View>

                        <View style={[styles.botonera,  {paddingLeft: 40}]}>
                            <ButtonAction action={"GOL"}/>
                            <ButtonAction action={"ANULADO"}/>
                            <ButtonAction action={"CAMBIO"}/>
                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("TARJETA")}>
                                <Image 
                                    style={styles.image}
                                    resizeMode={'contain'}
                                    source={require("../assets/penalty-card.png")}/>
                                <Text style={styles.buttonText}>TARJETA</Text>
                            </TouchableOpacity>                        
                            <ButtonAction action={"COMENTARIO"}/>                            
                        </View>
                    </View>
                </ScrollView>
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
        flex: 0.4,
        backgroundColor: colors.white,
        padding: 5
    },
    secondContainer:
    {
        flex: 0.6,
        backgroundColor: colors.white,
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
        paddingBottom: 20
    },
    nombreEquipoTexto:
    {
        fontSize: 20,
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
        flex: 1,
        resizeMode: 'contain',
        width: 75,
        height: 75,
        margin: 5
    },
    containerBotonera:
    {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    botonera:
    {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
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
        width: 140
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
        flex: 0.3,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 30
    },
    viewButton:
    {
        width: "100%"
    }
  });