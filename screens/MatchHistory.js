import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

export default function MatchHistory({route, navigation}) {
    
    const params = route.params;
    const escudo = params.escudo;
    const idEquipo = params.idEquipo;
    const nombreEquipo = params.nombreEquipo;
    const partidos = params.partidos;
    
    //se llama antes de renderizar
    useEffect(() => {
        
        //cambiamos el nombre de la barra
        console.log(escudo);
        console.log(idEquipo);
        console.log(nombreEquipo);
        console.log(partidos);
    });

    return (
        <SafeAreaView>
           <Text> Ho-La</Text>
        </SafeAreaView>
    );

}