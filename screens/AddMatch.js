import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View, Image, TouchableHighlight, FlatList, SafeAreaView, Button } from 'react-native';
import { Icon } from "react-native-elements";
import { RadioButton } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../config/colors';
import cons from '../config/cons';

export default function AddMatch({route, navigation}) {
    
    const params = route.params;
    const idEquipo = params.idEquipo;
    
    const [localVisitante, setLocalVisitante] = useState('local');
   
    //datepicker:
    const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

    //se llama antes de renderizar
    useEffect(() => {
        
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            
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

                <TextInput style={styles.textInput} placeholder={"Fecha y hora"} placeholderTextColor={"#777777"}/>
                <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
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
                
                {/*<TextInput style={styles.textInput} placeholder={"Estadio/Campo"} placeholderTextColor={"#777777"} onChangeText={text => setEmail(text)} />
                <TextInput style={styles.textInput} placeholder={"Druación partido (min)"} placeholderTextColor={"#777777"} onChangeText={text => setPass(text)}/>
                <TextInput style={styles.textInput} placeholder={"Nombre rival"} placeholderTextColor={"#777777"} onChangeText={text => setPass2(text)}/>
    <TextInput style={styles.textInput} placeholder={"Escudo rival"} placeholderTextColor={"#777777"} onChangeText={text => setIdProvincia(text)}/>*/}
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