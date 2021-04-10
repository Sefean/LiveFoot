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
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    );
}


