import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/LoginScreen'; // Importa tu pantalla de inicio de sesión
import RegistrationScreen from './src/pages/RegistrationScreen'; // Importa tu pantalla de registro
import FoodScreen from './src/pages/FoodScreen';


const Stack = createStackNavigator();

export default function Main() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen  options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen   options={{ headerShown: false }} name="Registration" component={RegistrationScreen} />
        <Stack.Screen   options={{ headerShown: false }} name="Food" component={FoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
