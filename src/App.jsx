import React, { useState } from 'react';
import './App.css';

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
      if (bmi < 18.5) message = 'Underweight 😔';
      else if (bmi >= 18.5 && bmi < 25) message = 'Normal Weight 😊';
      else if (bmi >= 25 && bmi < 30) message = 'Overweight 😟';
      else message = 'Obese 😰';

      setBmiMessage(message);
    } else {
      setBmiValue('');
      setBmiMessage('');
    }
  };

  return (
    <div className="container">
      <h1>✨ BMI Calculator ✨</h1>

      <label>Enter Your Height (cm):</label>
      <input 
        type="number" 
        placeholder="Height in cm"
        value={heightValue} 
        onChange={(e) => setHeightValue(e.target.value)} 
      />

      <label>Enter Your Weight (kg):</label>
      <input 
        type="number" 
        placeholder="Weight in kg"
        value={weightValue} 
        onChange={(e) => setWeightValue(e.target.value)} 
      />

      <button onClick={calculateBmi}>Calculate BMI</button>

      {bmiValue && bmiMessage && (
        <div className="result">
          <h2>Your BMI: {bmiValue}</h2>
          <h3 className="category">{bmiMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
