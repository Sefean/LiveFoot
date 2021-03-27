import React, {useEffect, useRef} from 'react';
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


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.escudoContainer}>
                <Image style={styles.escudo} source={{uri: escudo}} />
              
            </View>

            <View style={styles.secondContainer}>
                <View style={styles.row}>
                    <View style={styles.touchableContainer}>
                        <TouchableOpacity style={styles.touchable} onPress={()=>{console.log('add')}} >
                            <Icon size={60}  name="add" style={styles.icon}></Icon>
                            <Text style={styles.buttonText}>PARTIDO</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.touchableContainer}>
                        <TouchableOpacity style={styles.touchable} onPress={()=>{console.log('jugadores')}} >
                            
                            <Icon size={60} name="groups" style={styles.icon}></Icon>
                            <Text style={styles.buttonText}>JUGADORES</Text>
                        </TouchableOpacity>
                    </View>
                    

                   
                </View>             

                <View style={styles.row}>
                    <View style={styles.touchableContainer}>
                        <TouchableOpacity style={styles.touchable} onPress={()=>{console.log('calendario')}} >
                            <Icon size={60} name="calendar-today" style={styles.icon}></Icon>
                            <Text style={styles.buttonText}>PARTIDOS</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.touchableContainer}>
                        <TouchableOpacity style={styles.touchable} onPress={()=>{console.log('edit')}} >
                            <Icon size={60} name="edit" style={styles.icon}></Icon>
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
    touchableContainer:
    {        
        flex: 1,
        margin: 25,        
        justifyContent: 'center',
    },
    touchable:
    {
        flex: 1,
        backgroundColor: colors.lightgreen,
        padding: 25,
        borderRadius: 25,        
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