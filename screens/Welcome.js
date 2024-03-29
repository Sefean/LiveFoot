import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Alert, Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

import colors from '../config/colors';
import cons from '../config/cons';

export default function Welcome({navigation}) {

    const pressAdmin = () =>
    {
        navigation.navigate('Login');
    }

    const pressPublic = () =>
    {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        let apiUrl = cons.apiUrl + "/api.php?action=getClubes";

        fetch(apiUrl, {method: 'POST', headers: headers})
        .then((response)=>response.text())
        .then((response)=>{
                
            if(response)
            {
                let clubes = JSON.parse(response);        
                
                navigation.navigate('SelectClub', {clubes: clubes}); 
            }                
        })
        .catch((error)=>{console.log(error.message);Alert.alert("Error", "Error al obtener los clubes.");})
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                style={styles.image}
                resizeMode={'contain'}
                source={require("../assets/logo.png")}/>
            <TouchableHighlight onPress={pressAdmin} style={styles.buttons} underlayColor={colors.lightgreen}>    
                <View><Text style={styles.text}>ACCESO ADMINISTRADOR</Text></View>
            </TouchableHighlight>
            <TouchableHighlight onPress={pressPublic} style={styles.buttons} underlayColor={colors.lightgreen}>    
                <View><Text style={styles.text}>ACCESO PÚBLICO</Text></View>
            </TouchableHighlight>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        padding: 20,
        marginTop: 0,
    },
    image: 
    {
        alignSelf: 'center',
        width: '90%',
        height: '40%',
    },
    buttons:
    {
        backgroundColor: colors.mediumgreen,
        borderColor: colors.darkgreen,
        borderWidth: 3,
        borderRadius: 25,
        margin: 20,
        padding: 20,
    },
    text:
    {
        textAlign: "center",
        fontWeight: "bold", 
    }    
});