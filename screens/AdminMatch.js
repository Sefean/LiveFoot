import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import {StyleSheet, Text, TextInput, Alert, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";
import { useState } from 'react/cjs/react.development';
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
        
        <View style={{height: 140}}>
        
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

export default function AdminMatch({route, navigation}) {
    
    const params = route.params;
    const partido = params.partido;
    const jugadores = params.jugadores;
    const rivales = [];

    //general
    const [runTimer, setRunTimer] = useState(false);
    const [duration, setDuration] = useState(partido.minutos_partido);
    const [databaseTime, setDatabaseTime] = useState(partido.minuto_actual);
    const [minutoInicial, setMinutoInicial] = useState(partido.minuto_actual);

    //goles
    const [golesLocal, setGolesLocal] = useState(partido.goles_local);
    const [golesVisitante, setGolesVisitante] = useState(partido.goles_visitante);

    //reloj
    // - = sin empezar -> Iniciar partido
    // J1 = jugando primera parte -> Descanso
    // des = descanso -> Iniciar segunda parte
    // J2 = jugando segunda parte -> Finalizar
    const [showButton, setShowButton] = useState(partido.resultado);

    //para que warnings no salgan en pantalla
    LogBox.ignoreAllLogs();
    
    const buttonPressed = (action, navigation, jugadores, partido, equipo) =>
    {
        if(partido.local == equipo)
        {
            //nosotros
            switch (action) {
                case "GOL":
                    if(partido.local == 1)
                    {
                        gol(true, true);
                        setGolesLocal(parseInt(golesLocal) + 1);
                    }
                    else
                    {
                        gol(false, true);
                        setGolesVisitante(parseInt(golesVisitante) + 1);
                    }

                    navigation.navigate("SelectPlayerGoal", {jugadores: jugadores, partido: partido});
                break;
                
                case "GOL ANULADO":
                    if(partido.local == 1)
                    {
                        gol(true, false);
                        setGolesLocal(parseInt(golesLocal) - 1);
                    }
                    else
                    {
                        gol(false, false);
                        setGolesVisitante(parseInt(golesVisitante) - 1);
                    }
                    
                    navigation.navigate("SelectPlayerGoalDisallowed", {jugadores: jugadores, partido: partido});
                break;

                case "TARJETA":
                    navigation.navigate("SelectPlayerCarded", {jugadores: jugadores, partido: partido});
                break;

                case "CAMBIO":
                    navigation.navigate("SelectPlayerSubstitutionIn", {jugadores: jugadores, partido: partido});
                break;
                
                case "COMENTARIO":
                    navigation.navigate("SelectPlayerComment", {jugadores: jugadores, partido: partido});
                break;
            }
        }
        else
        {
            //el rival
            switch (action) {
                case "GOL":
                    //sumamos gol
                    if(partido.local == 0)
                    {
                        //local
                        gol(true, true);
                        setGolesLocal(parseInt(golesLocal) + 1);
                    }
                    else
                    {
                        //visitante
                        gol(false, true);
                        setGolesVisitante(parseInt(golesVisitante) + 1);
                    }

                    navigation.navigate("SelectPlayerGoal", {jugadores: rivales, partido: partido});
                    break;
                
                case "GOL ANULADO":
                    if(partido.local == 0)
                    {
                        gol(true, false);
                        setGolesLocal(parseInt(golesLocal) - 1);
                    }
                    else
                    {
                        gol(false, false);
                        setGolesVisitante(parseInt(golesVisitante) - 1);
                    }
                    navigation.navigate("SelectPlayerGoalDisallowed", {jugadores: rivales, partido: partido});
                break;
                
                case "TARJETA":
                    navigation.navigate("SelectPlayerCarded", {jugadores: rivales, partido: partido});
                break;

                case "CAMBIO":
                    navigation.navigate("SelectPlayerSubstitutionIn", {jugadores: rivales, partido: partido});
                break;
                
                case "COMENTARIO":
                    navigation.navigate("SelectPlayerComment", {jugadores: rivales, partido: partido});
                break;
            }
        }
    }

    const changeMatchResult = (resultado) =>
    {
        let apiUrl = cons.apiUrl + "/api.php?action=cambiarResultado";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            id_partido: partido.id_partido,
            resultado: resultado
        };

        fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
        .then((response)=>response.text())
        .then((response)=>{
                
            if(response)
            {
                console.log(response);

                setShowButton(resultado);
            }
        })
        .catch((error)=>{
            console.log(error.message);
            console.log("Error", "Error al actualizar el resultado en la base de datos.");
        });
    } 

    const changeTimer = (estado) =>
    {
        let resultado = "";

        switch (estado) {
            case "iniciar":
                setRunTimer(true);
                resultado = "J1";
            break;
            case "descanso":
                setRunTimer(false);
                resultado = "des";

            break;

            case "segundo":
                setRunTimer(true);
                resultado = "J2";
            break;

            case "fin":
                
                if(golesLocal == golesVisitante)
                {
                    resultado = "E";
                }
                else
                {
                    if(partido.local == 1)
                    {
                        if(golesLocal > golesVisitante)
                        {
                            resultado = "V";
                        }
                        else
                        {
                            resultado = "D";
                        }
                    }
                    else
                    {
                        if(golesLocal > golesVisitante)
                        {
                            resultado = "D";
                        }
                        else
                        {
                            resultado = "V";
                        }
                    }                   
                }
                
                setRunTimer(false);
                
            break;
        }
        
        changeMatchResult(resultado);        
    }

    //actualiza el resultado en la base de datos sumando o restando 1 gol al equipo local o visitante
    const gol = (local, suma) =>
    {
        let apiUrl = cons.apiUrl + "/api.php?action=gol";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            id_partido: partido.id_partido,
            local: local,
            suma: suma
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
            console.log("Error", "Error al intentar añadir/restar gol a la base de datos.");
        });
    }

    //funcion que controla el tiempo del partido y cada vez que pasa un minuto actualiza la bbdd
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
                console.log("Tiempo actualizado a: " + response);  
            }
        })
        .catch((error)=>{
            console.log(error.message);
            console.log("Error", "Error al intentar actualizar tiempo en base de datos.");
        })
        
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
            <Text style={styles.tiempo}>
                    <CountUp 
                        isCounting={runTimer}
                        start={parseInt(minutoInicial * 60)}
                        end={600}
                        duration={600}
                        easing="linear"
                        formatter={(val) => {
                            if(Math.trunc(val/60) > databaseTime)
                            {
                                //detectamos cuando pasa 1 min
                                actualizarTiempo(Math.trunc(val/60));                                  
                            }

                            val = Math.trunc(val/60);
                            return ("0" + val).slice(-2);
                            return val;
                        }}
                    />
                </Text>
                <CabeceraView partido={partido} golesLocal={golesLocal} golesVisitante={golesVisitante}/>
                
                {showButton == "-" && <TouchableOpacity style={styles.buttons} onPress={ () => changeTimer("iniciar")}>
                    <Text style={styles.buttonText}>INICIAR PARTIDO</Text>
                </TouchableOpacity>}

                {showButton == "J1" == true && <TouchableOpacity style={styles.buttons} onPress={ () => changeTimer("descanso")}>
                    <Text style={styles.buttonText}>DESCANSO</Text>
                </TouchableOpacity>}

                {showButton == "des" == true && <TouchableOpacity style={styles.buttons} onPress={ () => changeTimer("segundo")}>
                    <Text style={styles.buttonText}>INICIAR SEGUNDO TIEMPO</Text>
                </TouchableOpacity>}

                {showButton == "J2" == true && <TouchableOpacity style={styles.buttons} onPress={ () => changeTimer("fin")}>
                    <Text style={styles.buttonText}>FINALIZAR PARTIDO</Text>
                </TouchableOpacity>}

                {(showButton == "E" || showButton == "V" || showButton == "D") && <Text style={styles.textoFin}>Partido Finalizado</Text>}
               
            </View>

            <View style={styles.secondContainer}>
                <ScrollView>
                    <View style={styles.containerBotonera}>
                        <View style={[styles.botoneraLeft,  {paddingRight: 40}]}>
                            {/*botones del equipo local*/}
                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("GOL", navigation, jugadores, partido, !!partido.local)}>
                                <Icon size={60} name="sports-volleyball"></Icon>
                                <Text style={styles.buttonText}>GOL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("GOL ANULADO", navigation, jugadores, partido, !!partido.local)}>
                                <Icon size={60} name="remove-circle"></Icon>
                                <Text style={styles.buttonText}>GOL ANULADO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("CAMBIO", navigation, jugadores, partido, !!partido.local)}>
                                <Icon size={60} name="compare-arrows"></Icon>
                                <Text style={styles.buttonText}>CAMBIO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("TARJETA", navigation, jugadores, partido, !!partido.local)}>
                                <Image 
                                    style={styles.image}
                                    resizeMode={'contain'}
                                    source={require("../assets/penalty-card.png")}/>
                                <Text style={styles.buttonText}>TARJETA</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("COMENTARIO", navigation, jugadores, partido, !!partido.local)}>
                                <Icon size={60} name="mode-comment"></Icon>
                                <Text style={styles.buttonText}>COMENTARIO</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.botoneraRight,  {paddingLeft: 40}]}>
                            {/*botones del equipo visitante*/}
                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("GOL", navigation, jugadores, partido, !partido.local)}>
                                <Icon size={60} name="sports-volleyball"></Icon>
                                <Text style={styles.buttonText}>GOL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("GOL ANULADO", navigation, jugadores, partido, !partido.local)}>
                                <Icon size={60} name="remove-circle"></Icon>
                                <Text style={styles.buttonText}>GOL ANULADO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("CAMBIO", navigation, jugadores, partido, !partido.local)}>
                                <Icon size={60} name="compare-arrows"></Icon>
                                <Text style={styles.buttonText}>CAMBIO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("TARJETA", navigation, jugadores, partido, !partido.local)}>
                                <Image 
                                    style={styles.image}
                                    resizeMode={'contain'}
                                    source={require("../assets/penalty-card.png")}/>
                                <Text style={styles.buttonText}>TARJETA</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.touchable} onPress={ () => buttonPressed("COMENTARIO", navigation, jugadores, partido, !partido.local)}>
                                <Icon size={60} name="mode-comment"></Icon>
                                <Text style={styles.buttonText}>COMENTARIO</Text>
                            </TouchableOpacity>                           
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
        flex: 0.35,
        backgroundColor: colors.white,
    },
    secondContainer:
    {
        flex: 0.65,
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
        paddingVertical: 15
    },
    textoFin:
    {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    }
  });