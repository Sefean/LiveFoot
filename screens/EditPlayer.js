import React, {useEffect, useState} from 'react';
import { TouchableHighlight } from 'react-native';
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Button, TextInput } from 'react-native';
import { Icon } from "react-native-elements";

import colors from '../config/colors';
import cons from '../config/cons';

export default function EditPlayer({route, navigation}) {
    
    const params = route.params;
    const foto = params.foto;
    const paramsNombre = params.nombre;
    const paramsDorsal = params.dorsal;
    
    const [nombre, setNombre] = useState(paramsNombre);
    const [dorsal, setDorsal] = useState(paramsDorsal);

    //se llama antes de renderizar
    useEffect(() => {
        
        //cambiamos el nombre de la barra
        let newTitle = nombre.toUpperCase();
        navigation.setOptions({ title: newTitle })
    });

    const saveChanges = () =>
    {
        console.log('guardar');
     
    }
   
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.escudoContainer}>
                <Image style={styles.escudo} source={{uri: foto}} />
            </View>

            <View style={styles.secondContainer}>
                <Text style={styles.texto}>Dorsal:</Text>
                <TextInput defaultValue={dorsal} style={styles.textInput} placeholder={"Dorsal"} keyboardType="numeric" placeholderTextColor={"#777777"} onChangeText={text => setDorsal(text)} />
                <Text style={styles.texto}>Nombre:</Text>
                <TextInput defaultValue={nombre} style={styles.textInput} placeholder={"Nombre"} placeholderTextColor={"#777777"} onChangeText={text => setNombre(text)} />
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.buttonText}>CAMBIAR IMAGEN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.buttonText}>BORRAR JUGADOR</Text>
                </TouchableOpacity>
            </View>           
            <View style={styles.buttonContainer}>
              <TouchableHighlight onPress={saveChanges} style={styles.buttonSave} underlayColor={colors.lightgreen}>    
                  <View><Text style={styles.textButton}>GUARDAR</Text></View>
              </TouchableHighlight>
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
        fontSize: 20,
        margin: 5
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
        marginTop: "5%",
    },
    buttonContainer:
    {
        flexGrow: 0.1,
    },
    buttonSave:
    {
        flexGrow: 1,
        backgroundColor: colors.mediumgreen,
        borderColor: colors.darkgreen,
        borderTopWidth: 3,
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    }
});