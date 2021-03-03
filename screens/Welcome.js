import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Alert, Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

import colors from '../config/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Welcome({navigation}) {

    const adminPress = () =>
    {
        console.log('ADMINISTRADOR');
    }

    const publicPress = () =>
    {
        console.log('PÚBLICO');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                style={styles.image}
                resizeMode={'contain'}
                source={require("../assets/logo.png")}/>
            <TouchableHighlight onPress={adminPress} style={styles.buttons} underlayColor={colors.lightgreen}>    
                <View><Text style={styles.text}>ACCESO ADMINISTRADOR</Text></View>
            </TouchableHighlight>
            <TouchableHighlight onPress={publicPress} style={styles.buttons} underlayColor={colors.lightgreen}>    
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