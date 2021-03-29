import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View, Alert, Image, TouchableHighlight, FlatList, SafeAreaView, Button, TouchableWithoutFeedback, LogBox } from 'react-native';
import { Icon } from "react-native-elements";
import { RadioButton } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../config/colors';
import cons from '../config/cons';

import Toast from 'react-native-simple-toast';

export default function AddMatch({route, navigation}) {
    
  const params = route.params;
  const idEquipo = params.idEquipo;
  const paramsEstadio = params.estadio;
  const paramsMinutos_partido = params.minutos_partido;
  
  const [localVisitante, setLocalVisitante] = useState(1);
  const [estadio, setEstadio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [rival, setRival] = useState("");

  //datepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateString, setDateString] = useState("");
  const [dateSQL, setDateSQL] = useState("");

  const modifyDate = (selectedDate) => {
    let day = ("0" + selectedDate.getDate()).slice(-2);
    let month = ("0" + (selectedDate.getMonth() + 1)).slice(-2)
    let year = selectedDate.getFullYear();

    let aux_date = day + "/" + month + "/" + year;
    
    let aux_sqlDate = selectedDate.toISOString().slice(0, 19).replace('T', ' ');
    //nos quedamos con la fecha sin la hora
    aux_sqlDate = aux_sqlDate.substring(0,10);

    setDateSQL(aux_sqlDate);

    setDateString(aux_date);

    showTimepicker();
  }

  const modifyTime = (selectedTime) => {
    let aux_time =  ('0' + selectedTime.getHours()).slice(-2) + ":" + ('0'+selectedTime.getMinutes()).slice(-2);
    
    let aux_sqlHour = selectedTime.toISOString().slice(0, 19).replace('T', ' ');
    //nos quedamos con la hora sin la fecha
    aux_sqlHour = aux_sqlHour.substring(11,16);

    setDateString(dateString + " - " + aux_time);

    setDateSQL(dateSQL + " " + aux_sqlHour);

  }

  const onChange = (event, selectedDate) => {
  
    setShow(false);
    if(mode == 'date')
    {    
      modifyDate(selectedDate);      
    }
    else
    {
      modifyTime(selectedDate);
    }
    
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);    
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  //fin datepicker

  const saveMatch = () =>
  {
    var escudo = "esc_0.png";

    if(dateSQL && estadio && duracion && rival)
    {
      //llamamos a la api para guardar en la bbdd
      let apiUrl = cons.apiUrl + "/api.php?action=insertarPartido";
      let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      };

      let data = {
          id_equipo: idEquipo,
          local: localVisitante,
          estadio: estadio,
          minutos_partido: duracion,
          nombre_rival: rival,
          escudo_rival: escudo,
          fecha_hora: dateSQL,
      };

      fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
      .then((response)=>response.text())
      .then((response)=>{
        Toast.show(response);
        navigation.goBack();
      })
      .catch((error)=>{console.log(error.message);Alert.alert("Error", error.message);})
      }
      else
      {
        Alert.alert("Error", "Todos los campos deben ser rellenados.");
      }
  }

  return (
      <SafeAreaView style={styles.mainContainer}>
          
        {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

          <ScrollView style={styles.scrollView}>
              <View style={styles.radioContainer}>
                  <View style={styles.columnRadio}>
                      <RadioButton value="first" color={colors.mediumgreen} status={ localVisitante === 1 ? 'checked' : 'unchecked' } onPress={() => setLocalVisitante(1)}/>
                      <Text>LOCAL</Text>
                  </View>

                  <View style={styles.columnRadio}>
                      <RadioButton value="first" color={colors.mediumgreen} status={ localVisitante === 0 ? 'checked' : 'unchecked' } onPress={() => setLocalVisitante(0)}/>
                      <Text>VISITANTE</Text>
                  </View>
              </View>
              
              <TouchableWithoutFeedback onPress={showDatepicker}>
                <View>
                  <TextInput color={colors.black} value={dateString} editable={false} selectTextOnFocus={false} style={styles.textInput} placeholder={"Fecha y hora"} placeholderTextColor={"#777777"}/>
                </View>
              </TouchableWithoutFeedback>

              <TextInput defaultValue={paramsEstadio} style={styles.textInput} placeholder={"Estadio/Campo"} placeholderTextColor={"#777777"} onChangeText={text => setEstadio(text)} />
              <TextInput defaultValue={paramsMinutos_partido} style={styles.textInput} placeholder={"Duración partido (min)"} placeholderTextColor={"#777777"} keyboardType="numeric" onChangeText={text => setDuracion(text)}/>
              <TextInput style={styles.textInput} placeholder={"Nombre rival"} placeholderTextColor={"#777777"} onChangeText={text => setRival(text)}/>
              {/*<TextInput style={styles.textInput} placeholder={"Escudo rival"} placeholderTextColor={"#777777"} onChangeText={text => setIdProvincia(text)}/>*/}
          </ScrollView>
          <View style={styles.buttonContainer}>
              <TouchableHighlight onPress={saveMatch} style={styles.buttons} underlayColor={colors.lightgreen}>    
                  <View style={styles.viewButton}><Text style={styles.textButton}>GUARDAR</Text></View>
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
    }
  });