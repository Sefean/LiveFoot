import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

export default function ViewPlayer({route, navigation}) {
    
    const params = route.params;
    const foto = params.foto;
    const nombre = params.nombre;
    const dorsal = params.dorsal;
    const equipo = params.nombreEquipo;
    const club = params.nombreClub;
    
    //se llama antes de renderizar
    useEffect(() => {
        
        //cambiamos el nombre de la barra
        let newTitle = nombre.toUpperCase();
        navigation.setOptions({ title: newTitle })
    });

   
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.escudoContainer}>
                <Image style={styles.escudo} source={{uri: foto}} />
            </View>

            <View style={styles.secondContainer}>
                <Text style={styles.texto}>Dorsal: {dorsal}</Text>
                <Text style={styles.texto}>Nombre: {nombre}</Text>
                <Text style={styles.texto}>Club: {club}</Text>
                <Text style={styles.texto}>Equipo: {equipo}</Text>
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
        padding: 20,
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
    equiposView: {
        padding: 10,
        height: 50,
        borderTopWidth: 0.2
    },
    texto: {       
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5
    }
});