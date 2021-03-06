import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Alert, Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';
import { useState } from 'react/cjs/react.development';

export default function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const passInput = React.createRef();

    const pressRegistro = () =>
    {
        navigation.navigate('Registro');
    }

    const pressEntar = () =>
    {
        let apiUrl = "http://192.168.1.39:80/LiveFoot/api.php?action=login";
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                let data = {
                    email: email,
                    pass: pass,
                };

                console.log(JSON.stringify(data));

                fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
                .then((response)=>response.text())
                .then((response)=>{
                    
                    if(response == 0)
                    {
                        Alert.alert("Error", "Email y/o contraseña incorrecto.");

                        //limpiamos el campo contraseña
                        passInput.current.clear();
                    }
                    else if(response == 1)
                    {
                        console.log('in');
                    }                
                })
                .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error de servidor al intentar entrar. Pruebe más tarde.");})
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                style={styles.image}
                resizeMode={'contain'}
                source={require("../assets/logo.png")}/>
            <TextInput style={styles.input} placeholder={"Email"} onChangeText={text => setEmail(text)}></TextInput>
            <TextInput ref={passInput} style={styles.input} secureTextEntry={true} placeholder={"Contraseña"} onChangeText={text => setPass(text)}></TextInput>
            

            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.buttons} onPress={pressRegistro} underlayColor={colors.lightgreen}>    
                    <View style={styles.viewButton}><Text style={styles.text}>REGISTRO</Text></View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttons} onPress={pressEntar} underlayColor={colors.lightgreen}>    
                    <View style={styles.viewButton}><Text style={styles.text}>  ENTRAR  </Text></View>
                </TouchableHighlight>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer:
    {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    buttons:
    {
        backgroundColor: colors.mediumgreen,
        borderColor: colors.darkgreen,
        borderWidth: 3,
        borderRadius: 25,
        flex: 0.3,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 30
    },
    container: 
    {
        flex: 1,
        padding: 20,
    },
    image: 
    {
        alignSelf: 'center',
        width: '90%',
        height: '40%',
        flex: 1
    },
    input:
    {
        fontSize: 20,
        padding: 10,
        borderColor: colors.lightgreen,
        borderWidth: 3, 
        borderRadius: 25,
        marginBottom: 30
    },
    text:
    {
        textAlign: "center",
        fontWeight: "bold", 
    },
    viewButton:
    {
        width: "100%"
    }
});