import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const BmiCalculator = () => {
  const [heightValue, setHeightValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [bmiValue, setBmiValue] = useState('');
  const [bmiMessage, setBmiMessage] = useState('');

  const calculateBmi = () => {
    if (heightValue && weightValue) {
      const heightInMeters = parseFloat(heightValue) / 100;
      const bmi = (parseFloat(weightValue) / (heightInMeters * heightInMeters)).toFixed(2);
      setBmiValue(bmi);

      let message = '';
      if (bmi < 18.5) message = 'You are Underweight';
      else if (bmi >= 18.5 && bmi < 25) message = 'You are Normal weight';
      else if (bmi >= 25 && bmi < 30) message = 'You are Overweight';
      else message = 'You are Obese';

      setBmiMessage(message);
    } else {
      setBmiValue('');
      setBmiMessage('');
    }
  };

  return (
    <View>
      <Text>BMI Calculator</Text>

      <Text>Enter Your Height (cm):</Text>
      <TextInput keyboardType="numeric" value={heightValue} onChangeText={setHeightValue} />

      <Text>Enter Your Weight (kg):</Text>
      <TextInput keyboardType="numeric" value={weightValue} onChangeText={setWeightValue} />

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
