import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function DualRangeSliderCalories({ rangeValues, onRangeValuesChange }) {
  const [values, setValues] = useState(rangeValues); // Valores iniciales

  const handleRangeChange = (values) => {
    console.log(values)
    onRangeValuesChange(values);
  };
  const handleInput = (newValues) => {
    setValues(newValues);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Calorías:</Text>

    <RangeSlider
             style={{backgroundColor: "#FF3E30"}}
             min={100}
             max={10000}
             step={100}
             defaultValue={rangeValues}
             onInput={(values) => {
              // Manejar cambios en los valores del control deslizante aquí
              handleRangeChange(values);
              handleInput(values)
            }}
    />
     <View style={styles.sliderValues}>
        <Text style={styles.sliderValueText}>Min: {values[0]}</Text>
        <Text style={styles.sliderValueText}>Max: {values[1]}</Text>
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