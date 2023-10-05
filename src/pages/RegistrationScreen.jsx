import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Picker, ImageBackground, Dimensions } from "react-native";
import { TextInput, Button, Text, Avatar, Card, Title, Paragraph } from 'react-native-paper';

export default function RegistrationScreen({ route }) {

  const navigation = useNavigation();

  const { userInfo } = route.params; // Obtén la información del usuario desde la pantalla de inicio de sesión

  const [gender, setGender] = useState('');
  const [dailyCalories, setDailyCalories] = useState(null);
  const [name, setName] = useState(userInfo.name);
  const [age, setAge] = useState(null);
  const genderOptions = ['Femenino', 'Masculino', 'Otro'];

  const handleNavigationFood = () => {
    navigation.navigate('Food')
  }

  return (
    <ImageBackground
      source={require('./../images/background-image.jpg')} // Cambia esto con tu propia imagen de fondo
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" // Evita que el teclado cierre el ScrollView
      >
        <View style={styles.centeredContainer}> {/* Contenedor centrado */}
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.profileContainer}>
                <Avatar.Image size={80} source={{ uri: userInfo.picture }} />
                <Title style={styles.userName}>{userInfo.name}</Title>
              </View>
              <Text style={styles.sectionTitle}>Información Personal</Text>
              <TextInput label="Nombre" style={styles.input} value={name} onChangeText={(value) => setName(value)} />
              <TextInput
                label="Edad"
                style={styles.input}
                keyboardType="numeric"
                value={age !== null ? age.toString() : ''}
                onChangeText={(value) => {
                  // Filtra el valor ingresado para permitir solo números
                  const numericValue = value.replace(/[^0-9]/g, '');

                  // Verifica si el valor numérico está dentro del rango 1-100 o es nulo
                  if (numericValue === '' || (numericValue >= 1 && numericValue <= 100)) {
                    // Si es válido, establece la edad como número o como nulo si está vacío
                    const newAge = numericValue === '' ? null : parseInt(numericValue, 10);

                    // Verifica si la edad es mayor o igual a 0
                    if (newAge !== null && newAge >= 0) {
                      setAge(newAge);
                    } else {
                      // Si es menor que 0 o inválido, retiene el valor anterior
                      setAge(age);
                    }
                  } else {
                    // Si no es válido, retiene el valor anterior
                    setAge(age);
                  }
                }}
              />
              <Text style={styles.genderLabel}>Género</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  mode="dropdown"
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona el género" value="" />
                  {genderOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
              </View>
              <Text style={styles.sectionTitle}>Calorías Objetivo</Text>
              <TextInput
                label="Calorías objetivo diario"
                style={styles.input}
                keyboardType="numeric"
                value={dailyCalories !== null ? dailyCalories.toString() : ''}
                onChangeText={(value) => {
                  // Filtra el valor ingresado para permitir solo números
                  const numericValue = value.replace(/[^0-9]/g, '');

                  // Verifica si el valor numérico está dentro del rango 1-10000 o es nulo
                  if (numericValue === '' || (numericValue >= 1 && numericValue <= 10000)) {
                    // Si es válido, establece las calorías diarias como número o como nulo si está vacío
                    const newCalories = numericValue === '' ? null : parseInt(numericValue, 10);

                    setDailyCalories(newCalories);
                  } else {
                    // Si no es válido, no cambia el estado y el campo retiene el valor anterior
                    setDailyCalories(dailyCalories); // Retiene el valor anterior
                  }
                }}
              />

              <Button mode="contained" style={styles.registerButton} onPress={handleNavigationFood}>
                Registrar
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semi-transparente
  },
  centeredContainer: {
    width: '90%', // Ancho del contenedor centrado
  },
  card: {
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    marginLeft: 16,
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
  },
  genderLabel: {
    fontSize: 16,
    marginTop: 16,
  },
  pickerContainer: {
    borderColor: 'rgba(73, 69, 79, 1)',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 56,
    padding: 4,
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    letterSpacing: 0.15,
    lineHeight: 19.2,
    fontSize: 16,
    color: 'rgb(73, 69, 79)',
    verticalAlign: 'middle',
    textAlign: 'left',
    outline: 'none',
    backgroundColor: 'rgb(231 224 236)'
  },
  registerButton: {
    marginTop: 16,
    backgroundColor: "#FF3E30",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 1, // Ajusta el valor de opacidad aquí
  },
});
