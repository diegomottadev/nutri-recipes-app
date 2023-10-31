import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
// import CalorieRangeSlider from '../components/CaloriesRangeSlider';
// import DualRangeSliderCalories from "../components/DualRangeSliderCalories";
import OneRangeSliderPerson from "../components/OneRangeSliderPerson";

export default function FoodScreen() {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(1000);
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [calorieRange, setCalorieRange] = useState([800, 1600]);

  const handleSubmit = () => {
    // Validar que los valores sean números y que minValue sea menor o igual a maxValue
    if (
      !isNaN(minValue) &&
      !isNaN(maxValue) &&
      Number(minValue) <= Number(maxValue) &&
      !isNaN(peopleCount) &&
      selectedMeal !== ""
    ) {
      // Crear un objeto con los datos del formulario
      const formData = {
        minValue: Number(minValue),
        maxValue: Number(maxValue),
        peopleCount: Number(peopleCount),
        selectedMeal: selectedMeal,
      };

      // Realizar la solicitud POST al endpoint usando fetch
      fetch("https://tu-endpoint-api.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          // Manejar la respuesta de la API aquí
          if (response.status === 200) {
            console.log("Solicitud exitosa");
          } else {
            console.error("Error en la solicitud");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    } else {
      // Mostrar un mensaje de error si los datos no son válidos
      alert("Por favor, ingrese datos válidos.");
    }
  };

  const handleCalorieRangeChange = (values) => {
    // Aquí puedes manejar los valores mínimos y máximos seleccionados
    setMinValue(values[0]);
    setMaxValue(values[1]);
  };

  const handlePersonRangeChange = (value) => {
    // Aquí puedes manejar los valores mínimos y máximos seleccionados
    setPeopleCount(value);

  };
  return (
    <ImageBackground
    source={require('./../images/backgroud-food-screen.jpg')} // Cambia esto con tu propia imagen de fondo
    style={styles.backgroundImage}
  >
    <ScrollView
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled" // Evita que el teclado cierre el ScrollView
  >
    <View style={styles.centeredContainer}>
      {" "}
      {/* Contenedor centrado */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Nutrirecetas</Text>
          {/* <DualRangeSliderCalories
            rangeValues={calorieRange}
            onRangeValuesChange={handleCalorieRangeChange}
          /> */}
          <OneRangeSliderPerson
            rangeValuesPerson={peopleCount}
            onRangeValuesPersonChange={handlePersonRangeChange}
          />

          <Text style={styles.label}>Seleccione una comida:</Text>
          <View style={styles.buttonContainer}>
            <Button
              mode={selectedMeal === "Desayuno" ? "elevate" : "contained"}
              onPress={() => setSelectedMeal("Desayuno")}
              style={styles.button}
              labelStyle={styles.buttonText}
              >
              Desayuno
            </Button>
            <Button
              mode={selectedMeal === "Almuerzo" ? "elevate" : "contained"}
              onPress={() => setSelectedMeal("Almuerzo")}
              style={styles.button}
              labelStyle={styles.buttonText} // Establece el estilo del texto del botón
            >
              Almuerzo
            </Button>
            <Button
              mode={selectedMeal === "Merienda" ? "elevate" : "contained"}
              onPress={() => setSelectedMeal("Merienda")}
              style={styles.button}
              labelStyle={styles.buttonText} // Establece el estilo del texto del botón
            >
              Merienda
            </Button>
            <Button
              mode={selectedMeal === "Cena" ? "elevate" : "contained"}
              onPress={() => setSelectedMeal("Cena")}
              style={styles.button}
              labelStyle={styles.buttonText} // Establece el estilo del texto del botón
            >
              Cena
            </Button>
          </View>
          <Button mode="contained"  labelStyle={styles.buttonText} style={styles.acceptButton}  onPress={handleSubmit}> Aceptar </Button>
        </Card.Content>
      </Card>
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
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Centra horizontalmente
    fontFamily: "GloriaHallelujah-Regular"
  },
  input: {
    marginBottom: 20,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center", // Centra horizontalmente
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center", // Centra verticalmente
    alignItems: "stretch",
  },
  button: {
    marginVertical: 10,
    height: 60, // Aumentamos la altura del botón
    justifyContent: "center",
    backgroundColor: "#FF3E30",
  },
  buttonText: {
    fontSize: 24, // Reducimos el tamaño de la fuente para que quepa
    textAlign: "center",
    fontFamily: "OpenSans-Medium",
  },
  acceptButton: {
    marginVertical: 10,
    height: 60, // Aumentamos la altura del botón
    justifyContent: "center",
    backgroundColor: "rgb(103, 80, 164);", // Color de fondo del botón
  },
});






