import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

export default function AdminTeam({route, navigation}) {
    
    const params = route.params;
    const escudo = params.escudo;
    const idEquipo = params.idEquipo;
    const nombreEquipo = params.nombreEquipo;
    
    //se llama antes de renderizar
    useEffect(() => {
        //cambiamos el nombre de la barra
        navigation.setOptions({ title: nombreEquipo})
    });

    const cambiarPagina = (nombrePagina) => 
    {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let data = {
            id_equipo: idEquipo
        };

        if(nombrePagina == "MatchHistory")
        {
            let apiUrl = cons.apiUrl + "/api.php?action=getPartidos";

            fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
            .then((response)=>response.text())
            .then((response)=>{
                    
                if(response)
                {
                    let partidos = JSON.parse(response);

                     apiUrl = cons.apiUrl + "/api.php?action=getJugadores";

                    fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
                    .then((response)=>response.text())
                    .then((response)=>{
                            
                        if(response)
                        {
                            let jugadores = JSON.parse(response);
                            
                            navigation.navigate('MatchHistory', {
                                idEquipo: idEquipo,
                                partidos: partidos,
                                escudo: escudo,
                                nombreEquipo: nombreEquipo,
                                jugadores: jugadores,
                                admin: true});      
                        } 
                    })                
                }                
             })
            .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error al obtener los partidos del equipo.");})
        }
        else if(nombrePagina == "AddMatch")
        {
            let apiUrl = cons.apiUrl + "/api.php?action=getInfoEquipo";

            fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
            .then((response)=>response.text())
            .then((response)=>{
                    
                if(response)
                {
                    let infoEquipo = JSON.parse(response);

                    navigation.navigate(nombrePagina, {idEquipo: idEquipo, estadio: infoEquipo.estadio, minutos_partido: infoEquipo.minutos_partido});                 
                }                
             })
            .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error al obtener los partidos del equipo.");})
            
        }
        else if(nombrePagina == "Players")
        {
            let apiUrl = cons.apiUrl + "/api.php?action=getJugadores";

            fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
            .then((response)=>response.text())
            .then((response)=>{
                    
                if(response)
                {
                    let jugadores = JSON.parse(response);
                    
                    navigation.navigate(nombrePagina, {idEquipo: idEquipo, jugadores: jugadores, admin: true});                 
                }                
             })
            .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error al obtener los partidos del equipo.");})

        }
        else if(nombrePagina == "EditTeam")
        {
            let apiUrl = cons.apiUrl + "/api.php?action=getInfoEquipo";

            fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
            .then((response)=>response.text())
            .then((response)=>{
                    
                if(response)
                {
                    
                    let infoEquipo = JSON.parse(response);

                    navigation.navigate(nombrePagina, {idEquipo: idEquipo, estadio: infoEquipo.estadio, minutos_partido: infoEquipo.minutos_partido, nombre: infoEquipo.nombre})                 
                }                
             })
            .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error al obtener los partidos del equipo.");})
        }

    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.escudoContainer}>
                <Image style={styles.escudo} source={{uri: escudo}} />
            </View>

            <View style={styles.secondContainer}>

                <View style={styles.containerBotonera}>
                    <View style={styles.botonera}>
                        <TouchableOpacity style={styles.touchable} onPress={ () => cambiarPagina("AddMatch")}>
                            <Icon size={60} name="add-circle"></Icon>
                            <Text style={styles.buttonText}>CREAR PARTIDO</Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity style={styles.touchable} onPress={ () => cambiarPagina("Players")}>
                            <Icon size={60} name="groups"></Icon>
                            <Text style={styles.buttonText}>JUGADORES</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.botonera}>
                        <TouchableOpacity style={styles.touchable} onPress={ () => cambiarPagina("MatchHistory")}>
                            <Icon size={60} name="calendar-today"></Icon>
                            <Text style={styles.buttonText}>PARTIDOS</Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity style={styles.touchable} onPress={ () => cambiarPagina("EditTeam")}>
                            <Icon size={60} name="edit"></Icon>
                            <Text style={styles.buttonText}>EDITAR</Text>
                        </TouchableOpacity>                  
                    </View>
                </View>
            </View>           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: 
    {
      flex: 1,
    },
    escudoContainer:
    {
        flex: 0.25,
        backgroundColor: colors.white,
        padding: 25
    },
    secondContainer:
    {
        flex: 0.75,
        flexDirection: 'row'
    },
    row:
    {
        flex: 1,
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
        paddingTop: 25,
        paddingBottom: 25,
        marginTop: 50,
        borderRadius: 25,        
        backgroundColor: colors.greyWhite,
        width: 140,
        height: 140
    },
    textInput:
    {
        fontSize: 20,
        padding: 10,
        borderColor: colors.lightgreen,
        borderWidth: 3, 
        borderRadius: 25,
        marginBottom: 30
    },
    escudo:
    {   
        flex: 1,
        resizeMode: 'contain',
        width: null,
        height: null,
        margin: 5
    },
    buttonText: {        
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold' 
    },
  });