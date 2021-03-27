import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View, Image, TouchableHighlight, FlatList, SafeAreaView, Button, TouchableWithoutFeedback, LogBox } from 'react-native';
import { Icon } from "react-native-elements";
import { RadioButton } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../config/colors';
import cons from '../config/cons';

import { YellowBox } from "react-native";

export default function AddMatch({route, navigation}) {
    
  const params = route.params;
  const idEquipo = params.idEquipo;
  
  const [localVisitante, setLocalVisitante] = useState('local');
  const [email, setEstadio] = useState("");
  const [pass, setDuracion] = useState("");
  const [pass2, setRival] = useState("");

  //datepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateString, setDateString] = useState("");

  const modifyDate = (selectedDate) => {
    let aux_date = selectedDate.toLocaleDateString();
   
    let aux_date_arr = aux_date.split(/\//);

    aux_date = [aux_date_arr[1], aux_date_arr[0], aux_date_arr[2]].join("/");
    
    setDateString(aux_date);

    showTimepicker();
  }

  const modifyTime = (selectedTime) => {
    let aux_time =  selectedTime.getHours() + ":" + ('0'+selectedTime.getMinutes()).slice(-2);
    
    setDateString(dateString + " - " + aux_time)
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

  //se llama antes de renderizar
  useEffect(() => {
      
  });

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
                      <RadioButton value="first" color={colors.mediumgreen} status={ localVisitante === 'local' ? 'checked' : 'unchecked' } onPress={() => setLocalVisitante('local')}/>
                      <Text>LOCAL</Text>
                  </View>

                  <View style={styles.columnRadio}>
                      <RadioButton value="first" color={colors.mediumgreen} status={ localVisitante === 'visitante' ? 'checked' : 'unchecked' } onPress={() => setLocalVisitante('visitante')}/>
                      <Text>VISITANTE</Text>
                  </View>
              </View>
              
              <TouchableWithoutFeedback onPress={showDatepicker}>
                <View>
                  <TextInput color={colors.black} value={dateString} editable={false} selectTextOnFocus={false} style={styles.textInput} placeholder={"Fecha y hora"} placeholderTextColor={"#777777"}/>
                </View>
              </TouchableWithoutFeedback>

              <TextInput style={styles.textInput} placeholder={"Estadio/Campo"} placeholderTextColor={"#777777"} onChangeText={text => setEstadio(text)} />
              <TextInput style={styles.textInput} placeholder={"Druación partido (min)"} placeholderTextColor={"#777777"} keyboardType="numeric" onChangeText={text => setDuracion(text)}/>
              <TextInput style={styles.textInput} placeholder={"Nombre rival"} placeholderTextColor={"#777777"} onChangeText={text => setRival(text)}/>
              {/*<TextInput style={styles.textInput} placeholder={"Escudo rival"} placeholderTextColor={"#777777"} onChangeText={text => setIdProvincia(text)}/>*/}
          </ScrollView>
          <View style={styles.buttonContainer}>
              <TouchableHighlight style={styles.buttons} underlayColor={colors.lightgreen}>    
                  <View style={styles.viewButton}><Text style={styles.text}>GUARDAR</Text></View>
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
    }
  });