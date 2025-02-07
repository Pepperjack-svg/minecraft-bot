import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const BmiCalculator = () => {
  const [heightValue, setHeightValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [bmiValue, setBmiValue] = useState('');
  const [bmiMessage, setBmiMessage] = useState('');

  const calculateBmi = () => {
    const height = parseFloat(heightValue);
    const weight = parseFloat(weightValue);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid numeric values for height and weight.');
      setBmiValue('');
      setBmiMessage('');
      return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmiValue(bmi);

    let message = '';
    if (bmi < 18.5) message = 'You are Underweight';
    else if (bmi >= 18.5 && bmi < 25) message = 'You are Normal weight';
    else if (bmi >= 25 && bmi < 30) message = 'You are Overweight';
    else message = 'You are Obese';

    setBmiMessage(message);
  };

  return (
    <View>
      <Text>BMI Calculator</Text>

      <Text>Enter Your Height (cm):</Text>
      <TextInput 
        keyboardType="numeric" 
        value={heightValue} 
        onChangeText={setHeightValue} 
        placeholder="Height in cm"
      />

      <Text>Enter Your Weight (kg):</Text>
      <TextInput 
        keyboardType="numeric" 
        value={weightValue} 
        onChangeText={setWeightValue} 
        placeholder="Weight in kg"
      />

      <Button title="Calculate BMI" onPress={calculateBmi} />

      {bmiValue && bmiMessage ? (
        <View>
          <Text>Your BMI: {bmiValue}</Text>
          <Text>Result: {bmiMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default BmiCalculator;
