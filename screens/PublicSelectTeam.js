import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

export default function PublicSelectTeam({route, navigation}) {
    
    const params = route.params;
    const idClub = params.idClub;
    const escudo = params.escudo;
    const nombreClub = params.nombreClub;
    const equipos = params.equipos;
    
    //se llama antes de renderizar
    useEffect(() => {
        
        //cambiamos el nombre de la barra
        var newTitle = nombreClub.toUpperCase();
        navigation.setOptions({ title: newTitle })
    });

    const equipoSeleccionado = (idEquipo, nombre) => {
        navigation.navigate('PublicTeam', {escudo: escudo, idEquipo: idEquipo, nombreEquipo: nombre});
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.escudoContainer}>
                <Image style={styles.escudo} source={{uri: escudo}} />
            </View>

            <View style={styles.secondContainer}>
                <FlatList
                    data={equipos}
                    renderItem={({item}) => 
                    (
                        <TouchableOpacity onPress={ () => equipoSeleccionado(item.id_equipo, item.nombre)}>
                            <View style={styles.equiposView}>
                                <Text style={styles.equiposText}>{item.nombre}</Text>
                            </View>
                        </TouchableOpacity>
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
    escudoContainer:
    {
        flex: 0.25,
        backgroundColor: colors.white,
        padding: 25
    },
    secondContainer:
    {
        flex: 0.75
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
    equiposText: {        
        fontSize: 20,
    },
});