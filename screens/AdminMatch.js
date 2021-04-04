import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import {StyleSheet, Text, TextInput, Alert, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";
import { useState } from 'react/cjs/react.development';
import { CountUp } from 'use-count-up';

import colors from '../config/colors';
import cons from '../config/cons';

import { LogBox } from 'react-native';

function buttonPressed(action)
{
    switch (action) {
        case "GOL":
            
            break;
    
        default:
            Alert.alert("Algo raro ha pasado.");
            break;
    }
}

function ButtonAction(props)
{
    let action = props.action;
    let icon = "sports-volleyball";

    switch (action) {
        case 'GOL ANULADO':
            icon = "remove-circle";
            break;
        case 'CAMBIO':
            icon = "compare-arrows";
            break;
        case 'COMENTARIO':
            icon = "mode-comment"
            break;
        default:
            break;
    }
    return (
        <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed(action)}>
            <Icon size={60} name={icon}></Icon>
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
        
            <View style={styles.secondRow}>

                <View style={styles.columnSide}>
                    <View>
                        <Image style={styles.escudo} source={{uri: escudoLocal}} />
                    </View>
                    <Text style={styles.nombreEquipoTexto}>{nombreLocal}</Text>
                </View>
                
                <View style={styles.columnCenter}>
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

    const [starTimer, setStart] = useState(false);
    const [duration, setDuration] = useState(partido.minutos_partido);
    const [databaseTime, setDatabaseTime] = useState(partido.minuto_actual);

    //para que warnings no salgan en pantalla
    LogBox.ignoreAllLogs();

    const changeTimer = (iniciar) =>
    {
        setStart(iniciar);
    }

    const actualizarTiempo = (minutoActual) =>
    {
        //Warning: Cannot update a component from inside the function body of a different component. 
        setDatabaseTime(parseInt(databaseTime) + 1);
        
        let apiUrl = cons.apiUrl + "/api.php?action=updateMinutoActual";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            id_partido: partido.id_partido,
            minuto_actual: minutoActual
        };

        fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
        .then((response)=>response.text())
        .then((response)=>{
                
            if(response)
            {
                console.log(response);  
                   
            }
        })
        .catch((error)=>{
            console.log(error.message);
            console.log("Error", "Error al intentar actualizar tiempo en bse de datos.");
        })
        
    }

    /*const getMinutoActual = () =>
    {
        let apiUrl = cons.apiUrl + "/api.php?action=getMinutoActual";
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
                console.log("minuto actual es : " + response);
                setPhpTime(response);
            }
        })
        .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error al iniciar el crono.");})

    }*/

    useEffect(() => {

        //cambiamos el nombre de la barra       
        var titulo = partido.nombre + " - " + partido.nombre_rival;
        if(partido.local == 0)
        {
            titulo = partido.nombre_rival + " - " + partido.nombre;
        }

        navigation.setOptions({ title: titulo});
        console.log(databaseTime);
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.firstContainer}>
            <Text style={styles.tiempo}>
                    <CountUp 
                        isCounting={true}
                        start={parseInt(databaseTime * 60)}
                        end={6000}
                        duration={6000}
                        easing="linear"
                        formatter={(val) => {
                            if(Math.trunc(val/60) > databaseTime)
                            {
                                //detectamos cuando pasa 1 min
                                actualizarTiempo(Math.trunc(val/60));                                  
                            }

                            val = Math.trunc(val/60);
                            return ("0" + val).slice(-2);
                        }}
                    />
                </Text>
                <CabeceraView partido={partido} />
                

                
               
                <Button style={{marginBottom: 5}} title="start" onPress={ () => changeTimer(true)}></Button>
                <Button style={{padding: 5}} title="stop" onPress={ () => changeTimer(false)}></Button>
            </View>

            <View style={styles.secondContainer}>
                <ScrollView>
                    <View style={styles.containerBotonera}>
                        <View style={[styles.botonera,  {paddingRight: 40}]}>
                            <ButtonAction action={"GOL"}/>
                            <ButtonAction action={"GOL ANULADO"}/>
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
                            <ButtonAction action={"GOL ANULADO"}/>
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
        paddingBottom: 40
    },
    tiempo:
    {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
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