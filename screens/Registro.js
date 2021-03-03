import React, {useEffect, useState} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Registro_2({navigation}) {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [id_provincia, setIdProvincia] = useState("");
    const [escudo, setEscudo] = useState("");

    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState();

    const [arrayProvincias, setArrayProvincias] = useState();

    //se llama antes de renderizar
    useEffect(() => {
        let apiUrl = "http://10.0.2.2:80/LiveFoot/api.php?action=getProvincias";

        fetch(apiUrl).then((response) => response.json()).then((responseJson) => 
        {
            let dataSource = [];
            
            Object.values(responseJson).forEach(item => {
                dataSource = dataSource.concat(item);
                //console.log(item);
            });

            //https://stackoverflow.com/questions/53824116/react-hooks-usestate-array
            
            //console.log(dataSource);
            setArrayProvincias({dataSource})
        });

        /*for (var i = 0; i < arrayProvincias.length; i++)
        {
            console.log(arrayProvincias[i]);
        }*/
       
    });

    /*const getProvincias = () =>
    {
        let apiUrl = "http://10.0.2.2:80/LiveFoot/api.php?action=insertar_club";
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

    }*/

    const Registrar = () =>
    {
        //comprobamos que ha rellenado todos los campos
        if(nombre && email && pass && pass2 && id_provincia && escudo)
        {
            if(pass != pass2)
            {
                Alert.alert("Error", "Las contraseñas no coinciden.");
            }
            else
            {
                //llamamos a la api para guardar en la bbdd
                let apiUrl = "http://10.0.2.2:80/LiveFoot/api.php?action=insertar_club";
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                let data = {
                    nombre: nombre,
                    email: email,
                    pass: pass,
                    id_provincia: id_provincia,
                    escudo: escudo
                };

                console.log(JSON.stringify(data));

                fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
                .then((response)=>response.text())
                .then((response)=>{Alert.alert("Respuesta", response);})
                .catch((error)=>{console.log(error.message);Alert.alert("Error", error.message);})

                //https://stackoverflow.com/questions/56715637/using-ajax-on-react-native
                //https://es.reactjs.org/docs/faq-ajax.html
                             
            }
            
        }
        else
        {
            Alert.alert("Error", "Todos los campos deben ser rellenados.");
        }
       
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder={"Nombre"} placeholderTextColor={"#777777"} onChangeText={text => setNombre(text)} />
            <TextInput style={styles.textInput} placeholder={"Email"} placeholderTextColor={"#777777"} onChangeText={text => setEmail(text)} />
            <TextInput style={styles.textInput} placeholder={"Contraseña"} placeholderTextColor={"#777777"} secureTextEntry={true} onChangeText={text => setPass(text)}/>
            <TextInput style={styles.textInput} placeholder={"Repite ontraseña"} placeholderTextColor={"#777777"} secureTextEntry={true} onChangeText={text => setPass2(text)}/>
            <TextInput style={styles.textInput} placeholder={"Provincia"} placeholderTextColor={"#777777"} keyboardType="numeric" onChangeText={text => setIdProvincia(text)}/>
            <TextInput style={styles.textInput} placeholder={"Escudo"} placeholderTextColor={"#777777"} onChangeText={text => setEscudo(text)}/>

            <Picker
            selectedValue={provinciaSeleccionada}
            onValueChange={(itemValue, itemIndex) =>
                setProvinciaSeleccionada(itemValue)
            }>
            <Picker.Item label="Javass" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="JavaScript" value="js" />
            </Picker>
        
            <Button title={"Registrar"} onPress={Registrar}/>
            <Button title={"Cambiar pantalla"} onPress={() => navigation.navigate('Australopitecus')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: 
    {
      flex: 1,
      padding: 20,
      marginTop: 10
    },
  
    textInput:
    {
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        marginBottom: 20
    }
  });
  