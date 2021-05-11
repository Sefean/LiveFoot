import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View, Alert, Image, TouchableHighlight, FlatList, SafeAreaView, Button, TouchableWithoutFeedback, LogBox } from 'react-native';
import { Icon } from "react-native-elements";
import { RadioButton } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../config/colors';
import cons from '../config/cons';

import Toast from 'react-native-simple-toast';
import { TouchableOpacity } from 'react-native';

export default function EditTeam({route, navigation}) {
    
  const params = route.params;
  const idEquipo = params.idEquipo;
  const paramsEstadio = params.estadio;
  const paramsMinutos_partido = params.minutos_partido;
  const paramsNombre = params.nombre;

  const [estadio, setEstadio] = useState(paramsEstadio);
  const [duracion, setDuracion] = useState(paramsMinutos_partido);
  const [nombre, setRival] = useState(paramsNombre);

  const saveChanges = () =>
  {
    
      //llamamos a la api para guardar en la bbdd
      let apiUrl = cons.apiUrl + "/api.php?action=cambiosClub";
      let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      };

      let data = {
          id_equipo: idEquipo,
          nombre: nombre,
          estadio: estadio,
          minutos_partido: duracion,
      };

      fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
      .then((response)=>response.text())
      .then((response)=>{
          console.log(response);
        Toast.show(response);
        navigation.goBack();
      })
      .catch((error)=>{console.log(error.message);Toast.show("Error", error.message);console.log(error.message)})
     
  }

  return (
      <SafeAreaView style={styles.mainContainer}>

          <ScrollView style={styles.scrollView}>

              <Text style={styles.texto}>Estadio/Campo:</Text>
              <TextInput defaultValue={paramsEstadio} style={styles.textInput} placeholder={"Estadio/Campo"} placeholderTextColor={"#777777"} onChangeText={text => setEstadio(text)} />
              <Text style={styles.texto}>Duración partido (min):</Text>
              <TextInput defaultValue={paramsMinutos_partido} style={styles.textInput} placeholder={"Duración partido (min)"} placeholderTextColor={"#777777"} keyboardType="numeric" onChangeText={text => setDuracion(text)}/>
              <Text style={styles.texto}>Nombre equipo:</Text>
              <TextInput defaultValue={paramsNombre} style={styles.textInput} placeholder={"Nombre"} placeholderTextColor={"#777777"} keyboardType="numeric" onChangeText={text => setDuracion(text)}/>

              <TouchableOpacity style={styles.buttonEscudo}>
                    <Text style={styles.buttonText}>BORRAR EQUIPO</Text>
              </TouchableOpacity>
          </ScrollView>
          <View style={styles.buttonContainer}>
              <TouchableHighlight onPress={saveChanges} style={styles.buttons} underlayColor={colors.lightgreen}>    
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
      marginTop: 10
    },
    scrollView:
    {
        flex: 1,
        padding: 20,
    },
    radioContainer:
    {
        flex: 1,
        flexDirection: 'row'
    },
    columnRadio:
    {
        flex: 1,
        alignItems: 'center',
        marginBottom: 30
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
    buttonContainer:
    {
        flexGrow: 0.1,
    },
    buttons:
    {
        flexGrow: 1,
        backgroundColor: colors.mediumgreen,
        borderColor: colors.darkgreen,
        borderTopWidth: 3,
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    textButton: 
    {
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonEscudo:
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
    texto:
    {
        fontSize: 20,
        margin: 5
    }
  });