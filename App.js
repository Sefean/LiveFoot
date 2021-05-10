import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import Register from './screens/Register.js';
import Welcome from './screens/Welcome.js';
import Login from './screens/Login.js';
import AdminSelectTeam from './screens/AdminSelectTeam.js';
import AdminTeam from './screens/AdminTeam.js';
import AddMatch from './screens/AddMatch.js';
import MatchHistory from './screens/MatchHistory.js';
import Players from './screens/Players.js';
import AdminMatch from './screens/AdminMatch.js';
import SelectPlayerGoal from './screens/SelectPlayerGoal.js';
import SelectPlayerGoalDisallowed from './screens/SelectPlayerGoalDisallowed.js';
import SelectPlayerCarded from './screens/SelectPlayerCarded.js';
import SelectPlayerSubstitutionIn from './screens/SelectPlayerSubstitutionIn.js';
import SelectPlayerSubstitutionOut from './screens/SelectPlayerSubstitutionOut.js';
import SelectPlayerComment from './screens/SelectPlayerComment.js';
import SelectClub from './screens/SelectClub.js';
import PublicSelectTeam from './screens/PublicSelectTeam.js';
import PublicTeam from './screens/PublicTeam.js';
import PublicMatch from './screens/PublicMatch.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name = "Welcome"
          component = {Welcome}
          options={{headerShown: false }}
        />
      <Stack.Screen
          name = "Register"
          component = {Register}
          options={{title:'Register'}}
        />
        <Stack.Screen
          name = "Login"
          component = {Login}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name = "AdminSelectTeam"
          component = {AdminSelectTeam}
          options={{title:'SELECCIÓN DE EQUIPO'}}
        />
        <Stack.Screen
          name = "AdminTeam"
          component = {AdminTeam}
          options={{title:'EDITAR EQUIPO'}}
        />
        <Stack.Screen
          name = "AddMatch"
          component = {AddMatch}
          options={{title:'NUEVO PARTIDO'}}
        />
        <Stack.Screen
          name = "MatchHistory"
          component = {MatchHistory}
          options={{title:'PARTIDOS'}}
        />
        <Stack.Screen
          name = "Players"
          component = {Players}
          options={{title:'JUGADORES'}}
        />
        <Stack.Screen
          name = "AdminMatch"
          component = {AdminMatch}
          options={{title:'PARTIDO'}}
        />
        <Stack.Screen
          name = "SelectPlayerGoal"
          component = {SelectPlayerGoal}
          options={{title:'SELECCIONA GOLEADOR'}}
        />   
        <Stack.Screen
          name = "SelectPlayerGoalDisallowed"
          component = {SelectPlayerGoalDisallowed}
          options={{title:'SELECCIONA JUGADOR'}}
        />    
        <Stack.Screen
          name = "SelectPlayerCarded"
          component = {SelectPlayerCarded}
          options={{title:'JUGADOR AMONESTADO'}}
        />
        <Stack.Screen
          name = "SelectPlayerSubstitutionIn"
          component = {SelectPlayerSubstitutionIn}
          options={{title:'JUGADOR ENTRA AL CAMPO'}}
        /> 
        <Stack.Screen
          name = "SelectPlayerSubstitutionOut"
          component = {SelectPlayerSubstitutionOut}
          options={{title:'JUGADOR SALE DEL CAMPO'}}
        /> 
        <Stack.Screen
          name = "SelectPlayerComment"
          component = {SelectPlayerComment}
          options={{title:'AÑADIR COMENTARIO'}}
        />
        <Stack.Screen
          name = "SelectClub"
          component = {SelectClub}
          options={{title:'SELECCIÓN DE CLUB'}}
        />
        <Stack.Screen
          name = "PublicSelectTeam"
          component = {PublicSelectTeam}
          options={{title:'SELECCION DE EQUIPO'}}
        />
        <Stack.Screen
          name = "PublicTeam"
          component = {PublicTeam}
          options={{title:'EQUIPO'}}
        />
        <Stack.Screen
          name = "PublicMatch"
          component = {PublicMatch}
          options={{title:'PARTIDO'}}
        />    
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    );
}


