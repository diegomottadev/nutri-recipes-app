import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';

export default function OneRangeSliderPerson({ rangeValuesPerson, onRangeValuesPersonChange }) {
    const [value, setValue] = useState(rangeValuesPerson); // Valor inicial del rango

    // Manejador de cambios cuando el pulgar se mueve
    const handleThumbChange = (newValue) => {
      setValue(newValue);
      onRangeValuesPersonChange(values);

    };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Personas:</Text>
        <Slider
            minimumValue={1}
            maximumValue={20}
            step={1}
            minimumTrackTintColor="#ddd"
            maximumTrackTintColor="#ddd"
            thumbTintColor="rgb(255, 62, 48)"
            value={value}
                onValueChange={(value) => handleThumbChange(value)}
            />
        <View style={styles.sliderValues}>
            <Text style={styles.sliderValueText}>Min: {value}</Text>
        
        </View>
    </View>
);
}


const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    sliderValues: {
      padding: '5px',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sliderValueText:{
      fontSize: 18,
      fontWeight: 'bold',
    }
});