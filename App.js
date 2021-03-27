import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register.js';
import Welcome from './screens/Welcome.js';
import Login from './screens/Login.js';
import AdminSelectTeam from './screens/AdminSelectTeam.js';
import AdminTeam from './screens/AdminTeam.js';
import AddMatch from './screens/AddMatch.js';

import { SafeAreaProvider } from 'react-native-safe-area-context';

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
          options={{title:'Selección de equipo'}}
        />
        <Stack.Screen
          name = "AdminTeam"
          component = {AdminTeam}
          options={{title:'Editar equipo'}}
        />
        <Stack.Screen
          name = "AddMatch"
          component = {AddMatch}
          options={{title:'Nuevo partido'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    );
}


