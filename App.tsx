import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { BleManager, Device } from 'react-native-ble-plx';

//import text from "./text.json";

const bleManager = new BleManager();
const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd'

interface Props { }


const App: React.FC<Props> = () => {

  const [run, setRun] = useState(false)
  const [numberInputValue, setNumberInputValue] = useState('50')
  const [numberValue, setNumberValue] = useState(50)

  const handleButtonSetPress = () => {
    const inputNumber = Number(numberInputValue);
    if (inputNumber < 10 && inputNumber > 0) {
      setNumberValue(Number(numberInputValue));
    }
  };

  const handleButtonStartPress = () => {
    console.log('SNAKE GOING FORWARD')
    setRun(true)
  }

  const handleButtonStopPress = () => {
    console.log('SNAKE STOPPED')
    setRun(false)
  }

  const handleButtonConcertina = () => {
    console.log('CONCERTINA')
  }

  const handleButtonUndulated = () => {
    console.log('UNDULATED')
  }

  const handleNumberInputChange = (value: string) => {
    setNumberInputValue(value);
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleButtonStartPress}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleButtonStopPress}>
        <Text style={styles.buttonText}>STOP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleButtonStartPress}>
        <Text style={styles.buttonMotion}>Concertina</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleButtonStopPress}>
        <Text style={styles.buttonMotion}>Undulated</Text>
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
  buttonMotion: {
    color: '#AAAAAA',
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
