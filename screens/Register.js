import React, {useEffect, useState} from 'react';
import { Alert, Button, Image, ImagePickerIOS, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
import cons from '../config/cons';

export default function Registro({navigation}) {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [escudo, setEscudo] = useState("");

    const [image, setImage] = useState(null);

    const createFormData = (img, body) => {
        const data = new FormData();
      
        data.append('photo', {
          name: img.fileName,
          type: img.type,
          uri:
            Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
        });
      
        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
      
        return data;
    };

    const uploadImg = (img) => 
    {
        const formData = new FormData();
        formData.append('image', {
            uri: img.uri,
            name: 'my_photo.png',
            type: 'image/png'
          });
          formData.append('Content-Type', 'image/png');

          fetch(cons.apiUrl + "/api.php?action=uploadImg",{
              method: 'POST',
              headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
            .then((response) => response)
            .then((response) => {
                console.log('a');  
               console.log(response);     
              })
              .catch((error) => {
                console.log('b'); 
                  console.log(error);
                });       
    };

    const pickImage = async () => 
    {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [16, 16],
          quality: 1,
        });

        if (!result.cancelled) {
            
            //establecemos la imagen en la pantalla
            setImage(result.uri);

            //mandamos la imagen para subir
            uploadImg(result);
        }
    };

    const Registrar = () =>
    {
        //comprobamos que ha rellenado todos los campos
        if(nombre && email && pass && pass2)
        {
            if(pass != pass2)
            {
                Alert.alert("Error", "Las contraseñas no coinciden.");
            }
            else
            {
                //llamamos a la api para guardar en la bbdd
                let apiUrl = cons.apiUrl + "/api.php?action=insertarClub";
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                let data = {
                    nombre: nombre,
                    email: email,
                    pass: pass,
                    escudo: escudo
                };

                console.log(JSON.stringify(data));

                fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
                .then((response)=>response.text())
                .then((response)=>{Alert.alert("Respuesta", response);})
                .catch((error)=>{console.log(error.message);Alert.alert("Error", error.message);})

                //https://stackoverflow.com/questions/56715637/using-ajax-on-react-native
                             
            }
            
        }
        else
        {
            Alert.alert("Error", "Todos los campos deben ser rellenados.");
        }
       
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <TextInput style={styles.textInput} placeholder={"Nombre del club"} placeholderTextColor={"#777777"} onChangeText={text => setNombre(text)} />
                <TextInput style={styles.textInput} placeholder={"Email"} placeholderTextColor={"#777777"} onChangeText={text => setEmail(text)} />
                <TextInput style={styles.textInput} placeholder={"Contraseña"} placeholderTextColor={"#777777"} secureTextEntry={true} onChangeText={text => setPass(text)}/>
                <TextInput style={styles.textInput} placeholder={"Repite contraseña"} placeholderTextColor={"#777777"} secureTextEntry={true} onChangeText={text => setPass2(text)}/>
                <Button title={"Elegir escudo"} onPress={pickImage}/>
            {<Image style={styles.escudo} source={{ uri: image }}/>}

                <Image style={styles.escudo} source={{uri: cons.apiUrl + '/img/escudoDefault.png'}} />
                
                {<Button title={"Registrar"} onPress={Registrar}/>}
            
            </ScrollView>
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
        fontSize: 20,
        padding: 10,
        borderColor: colors.lightgreen,
        borderWidth: 3, 
        borderRadius: 25,
        marginBottom: 30
    },
    escudo:
    {   
        margin: 25,
        alignSelf: 'center',
        width: 200,
        height: 200
    }
  });
  