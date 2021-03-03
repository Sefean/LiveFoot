import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registro from './screens/Registro.js';
import Tests from './screens/tests.js';
import Welcome from './screens/Welcome.js';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name = "Welcome"
          component = {Welcome}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name = "Registro"
          component = {Registro}
          options={{title:'Registro'}}
        />
        <Stack.Screen
          name = "Australopitecus"
          component = {Tests}
          options={{title:'Test'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
}


