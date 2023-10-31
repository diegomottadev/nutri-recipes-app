import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require("./../images/backgroud-food-screen.jpg")} // Cambia esto con tu propia imagen de fondo
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" // Evita que el teclado cierre el ScrollView
      >
        <View style={styles.centeredContainer}>
          <Text style={styles.title}>Nutrirecetas</Text>
          <ActivityIndicator animating={true} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1, // Ajusta el valor de opacidad aquí
  },
  container: {
    flexGrow: 1,
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Fondo semi-transparente
  },
  centeredContainer: {
    width: "90%", // Ancho del contenedor centrado
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Centra horizontalmente
    fontFamily: "GloriaHallelujah-Regular",
  },
});
