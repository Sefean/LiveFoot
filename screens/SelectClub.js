import { func } from 'prop-types';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import { useState } from 'react/cjs/react.development';


import colors from '../config/colors';
import cons from '../config/cons';

function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          /*value={query}
          onChangeText={queryText => handleSearch(queryText)}*/
          placeholder="Buscar..."
          style={{ backgroundColor: '#fff', borderBottomWidth: 0.2 }}
        />
      </View>
    );
  }

  function renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        
        }}
      />
    );
  }

export default function SelectClub({route, navigation}) {
    
    const params = route.params;
    const clubes = params.clubes;

    //para la busqueda
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);


    const equipoSeleccionado = (idClub, nombre, escudo) => {
      let equipos = new Array();

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      let apiUrl = cons.apiUrl + "/api.php?action=getInfoClub";

      let data = {
          idclub: idClub
      };

      fetch(apiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)})
      .then((response)=>response.text())
      .then((response)=>{
          
          if(response)
          {
            console.log(response);
              let infoClub = JSON.parse(response);
          
              equipos = infoClub.equipos;
              
              navigation.navigate('PublicSelectTeam', {idClub: idClub, nombreClub: nombre, escudo: escudo, equipos: equipos});
              
          }                
      })
      .catch((error)=>{console.log(error.message);console.log("Error", "Error al obtener la información del club.");})
      
    }

    return (
        <SafeAreaView style={styles.mainContainer}>            
            <FlatList
                ListHeaderComponent={renderHeader}
                ItemSeparatorComponent={renderSeparator}
                data={clubes}
                renderItem={({item}) => 
                (
                    <TouchableOpacity onPress={ () => equipoSeleccionado(item.id_club, item.nombre, cons.apiUrl + '/img/' + item.escudo)}>
                        <View style={styles.clubesView}>
                            <View style={styles.columImg}>
                                <Image style={styles.escudo} source={{uri: cons.apiUrl + '/img/' + item.escudo}} />
                            </View>
                            <View style={styles.columText}>
                                <Text style={styles.clubesText}>{item.nombre}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}keyExtractor={(item, index) => index.toString()}
            />                   
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: 
    {
      flex: 1,
      backgroundColor: colors.white,
    },
    clubesView: {
        height: 50,
        flexDirection: "row",
    },
    clubesText: {        
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    escudo:
    {
        flex: 1,
        resizeMode: 'contain',
    },
    columImg:
    {
        flex: 0.2,
        paddingTop: 5,
        paddingBottom: 5
    },
    columText:
    {
        flex: 0.8,
        alignSelf: 'center'
    }
});