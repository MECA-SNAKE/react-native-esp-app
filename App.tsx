import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

interface Props {}

const App: React.FC<Props> = () => {
  const [numberInputValue, setNumberInputValue] = useState('50');
  const [numberValue, setNumberValue] = useState(50);

  const handleButtonStartPress = () => {
    console.log('SNAKE GOING FORWARD');
  };

  const handleButtonStopPress = () => {
    console.log('SNAKE STOPPED');
  };

  const handleButtonSetPress = () => {
    const inputNumber = Number(numberInputValue);
    if(inputNumber < 10 && inputNumber > 0){
      setNumberValue(Number(numberInputValue));}
  };

  const handleNumberInputChange = (value: string) => {
    setNumberInputValue(value);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleButtonStartPress}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonStopPress}>
        <Text style={styles.buttonText}> STOP </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.button2]} onPress={handleButtonSetPress}>
        <Text style={styles.buttonText}>Set WaveLength</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        value={numberInputValue}
        onChangeText={handleNumberInputChange}
      />
      <Text style={styles.numberValueText}>{`WaveLength value : ${numberValue}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  button2: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    width: '80%',
    height: 40,
    paddingHorizontal: 16,
    marginTop: 16,
    fontSize: 16,
  },
  numberValueText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
