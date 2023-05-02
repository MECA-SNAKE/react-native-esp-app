import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';


//import text from "./text.json";

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd'

interface Props { }


const App: React.FC<Props> = () => {

  const [run, setRun] = useState(false)
  const [numberInputValue, setNumberInputValue] = useState('0')
  const [numberValue, setNumberValue] = useState(0)
  const [isConcertinaPressed, setIsConcertinaPressed] = useState(false);
  const [isUndulatedPressed, setIsUndulatedPressed] = useState(false);


  const handleButtonSetPress = () => {
    const inputNumber = Number(numberInputValue);
    if (inputNumber < 10 && inputNumber > 0) {
      setNumberValue(inputNumber);
    }
    Keyboard.dismiss();
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
    if(run){
      console.log('CONCERTINA')
      setIsConcertinaPressed(!isConcertinaPressed);
      setIsUndulatedPressed(false);}
    
  }

  const handleButtonUndulated = () => {
    if(run){
      console.log('UNDULATED')
      setIsUndulatedPressed(!isUndulatedPressed);
      setIsConcertinaPressed(false);}
  }

  const handleNumberInputChange = (value: string) => {
    if(run){
      setNumberInputValue(value);}
  }

  const handleButtonReset = () => {
    setRun(false)
    setIsConcertinaPressed(false);
    setIsUndulatedPressed(false);
    setNumberInputValue('0')
  }


  return (

    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={handleButtonReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, run && styles.pressedButton]} onPress={handleButtonStartPress}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, !run && styles.pressedButton]} onPress={handleButtonStopPress}>
        <Text style={styles.buttonText}>STOP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, isConcertinaPressed && styles.pressedButton]} onPress={handleButtonConcertina}>
        <Text style={styles.buttonMotion}>Concertina</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, isUndulatedPressed && styles.pressedButton]} onPress={handleButtonUndulated}>
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
      <Text style={styles.numberValueText}>{`WaveLength value : ${numberInputValue}`}</Text>
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
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonMotion: {
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
  pressedButton: {
    backgroundColor: '#1D6403',
  }
});

export default App;
