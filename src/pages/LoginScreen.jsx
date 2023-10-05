import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button, Title, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '338701468364-p64uvh041cq9c0go3bregn13rpclteef.apps.googleusercontent.com',
    webClientId: '338701468364-5s2093k9tgj6tvp781k587t4194nd1c7.apps.googleusercontent.com',
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
        const user = await AsyncStorage.getItem('@user');
        navigation.navigate('Registration', { userInfo: JSON.parse(user)} );

      } else {
        // Handle cancel or error
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
     
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      
    } catch (error) {
      // Handle error
    }
  }
  return (
    <ImageBackground
      source={require('./../images/background-image.jpg')} // Cambia esto con tu propia imagen de fondo
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Title style={styles.title}>Nutrirecetas</Title>
        {userInfo && (
          <View>
            <Text style={styles.userInfo}>¡Bienvenido, {userInfo.name}!</Text>
          </View>
        )}
        <Button
          mode="contained"
          style={styles.googleButton}
          onPress={promptAsync}
          disabled={!request}
        >
          Iniciar sesión con Google
        </Button>
        {userInfo && (
          <Button
            mode="outlined"
            style={styles.logoutButton}
            onPress={() => {
              AsyncStorage.removeItem('@user');
              setUserInfo(null);
            }}
          >
            Cerrar sesión
          </Button>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 1, // Ajusta el valor de opacidad aquí
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semi-transparente
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FF3E30', // Cambia el color según tu preferencia
  },
  logoutButton: {
    width: '100%',
    padding: 10,
    borderColor: '#FF3E30', // Color del borde
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
});
