// Lexique pour les commandes
// "1" == START
// "0" == STOP
// "2" == CONCERTINA (only possible while we are moving)
// "3" == ONDULATED (only possible while we are moving)



import React, { useState } from 'react';
import axios from 'axios';
import Slider from '@react-native-community/slider'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard} from 'react-native';


//import text from "./text.json";

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd'

interface Props { }


const App: React.FC<Props> = () => {

  const [run, setRun] = useState(false)
  const [WLsliderValue, setWLSliderValue] = useState(0.5)
  const [AmplsliderValue, setAmplSliderValue] = useState(30)
  const [FreqsliderValue, setFreqSliderValue] = useState(0.5)
  const [isConcertinaPressed, setIsConcertinaPressed] = useState(false);
  const [isUndulatedPressed, setIsUndulatedPressed] = useState(false);
  const [isBackwardsPressed, setIsBackwards] = useState(false)

  function sendRequests(val: string, root: string){
    axios.post('http://192.168.34.121/' + root, {
      "value": val
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }


  // const handleButtonSetPress = () => {
  //   const inputNumber = Number(numberInputValue);
  //   if (inputNumber < 10 && inputNumber > 0) {
  //     setNumberValue(inputNumber);
  //   }
  //   Keyboard.dismiss();
  // };

  const handleButtonStartPress = () => {
    if(isConcertinaPressed || isUndulatedPressed){
      console.log('SNAKE GOING FORWARD')
      setRun(true)
      sendRequests("1", "mode")
    }
  }

  const handleButtonStopPress = () => {
    console.log('SNAKE STOPPED')
    setRun(false)
    sendRequests("0", "mode")
  }

  const handleButtonConcertina = () => {
    if(!run){
      console.log('CONCERTINA')
      sendRequests("0", "motion")
      setIsConcertinaPressed(!isConcertinaPressed);
      setIsUndulatedPressed(false);}
    
  }

  const handleButtonUndulated = () => {
    if(!run){
      console.log('UNDULATED')
      sendRequests("1", "motion")
      setIsUndulatedPressed(!isUndulatedPressed);
      setIsConcertinaPressed(false);}
  }

  const handleWLChange = (value: number) => {
    console.log('new WL value updated')
    setWLSliderValue(value / 10);
    sendRequests(String(value), "paramsWL")
  }

  const handleFreqChange = (value: number) => {
    console.log('new Freq value updated')
    setFreqSliderValue(value / 10);
    sendRequests(String(value/10), "paramsFreq")
  }

  const handleAmplChange = (value: number) => {
    console.log('new Ampl value updated')
    setAmplSliderValue(value);
    sendRequests(String(value), "paramsAmpl")
  }

  const handleButtonReset = () => {
    sendRequests("0", "mode")
    setRun(false)
    setIsBackwards(false)
    setIsConcertinaPressed(false)
    setIsUndulatedPressed(false)
  }

  const handleBackwards = () => {
    if(!run){
      console.log("BACKWARDS")
      setIsBackwards(true)
      sendRequests("0", "direction")
    }
  }
  
  const handleForward = () => {
    if(!run){
      console.log("FORWARDS")
      setIsBackwards(false)
      sendRequests("1", "direction")

    }
  }


  return (

    <View style={styles.container1}>
      <TouchableOpacity style={styles.button} onPress={handleButtonReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <Text style={styles.titleMode}>MODE</Text>
      
      <View style = {styles.containerButtons}>
        <TouchableOpacity style={[styles.button, run && styles.pressedButton]} onPress={handleButtonStartPress}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !run && styles.pressedButton]} onPress={handleButtonStopPress}>
          <Text style={styles.buttonText}>STOP</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titleMode}>MOTION</Text>

      <View style = {styles.containerButtons}>
        <TouchableOpacity style={[styles.button, isConcertinaPressed && styles.pressedButton]} onPress={handleButtonConcertina}>
          <Text style={styles.buttonMotion}>Concertina</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, isUndulatedPressed && styles.pressedButton]} onPress={handleButtonUndulated}>
          <Text style={styles.buttonMotion}>Undulated</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.titleMode}>DIRECTION</Text>
        <View style = {styles.containerButtons}>
          <TouchableOpacity style={[styles.button, isBackwardsPressed && styles.pressedButton]} onPress={handleBackwards}>
            <Text style={styles.buttonMotion}>Backwards</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, !isBackwardsPressed && styles.pressedButton]} onPress={handleForward}>
            <Text style={styles.buttonMotion}>Forward</Text>
          </TouchableOpacity>

      </View>

      <Text style={styles.titleMode}>PARAMETERS</Text>

      <Text style={styles.subTitle}>Set WaveLength</Text>

      <Slider
        style={{width: 200, height: 40}}
        minimumValue={5}
        maximumValue={40}
        step={1}
        value={WLsliderValue}
        onValueChange={handleWLChange}
        />
        <Text>Value: {WLsliderValue}</Text>

        
      <Text style={styles.subTitle}>Set Amplitude</Text>

      <Slider
        style={{width: 200, height: 40}}
        minimumValue={30}
        maximumValue={70}
        step={1}
        value={AmplsliderValue}
        onValueChange={handleAmplChange}
        />
        <Text>Value: {AmplsliderValue}</Text>

        <Text style={styles.subTitle}>Set Frequency</Text>

        <Slider
        style={{width: 200, height: 40}}
        minimumValue={5}
        maximumValue={40}
        step={1}
        value={FreqsliderValue}
        onValueChange={handleFreqChange}
        />
        <Text>Value: {FreqsliderValue}</Text>

{/* 
      <TouchableOpacity style={[styles.button, styles.button2]} onPress={handleButtonSetPress}>
        <Text style={styles.buttonText}>Set WaveLength</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        value={numberInputValue}
        onChangeText={handleNumberInputChange}
      />
      <Text style={styles.numberValueText}>{`WaveLength value : ${numberInputValue}`}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  container4Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  titleMode:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16

  },

  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    marginRight: 200,

  },


  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 15,
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
