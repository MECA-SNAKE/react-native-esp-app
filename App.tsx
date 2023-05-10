

import React, { useState } from 'react';
import axios from 'axios';
import Slider from '@react-native-community/slider'
import { StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';

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
  const [isInchwormPressed, setIsInchworm] = useState(false)

  function sendRequests(val: string, root: string){
    axios.post('http://192.168.34.121/' + root, {
      "value": val
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }

  const handleButtonStartPress = () => {
    if(isConcertinaPressed || isUndulatedPressed || isInchwormPressed){
      setRun(true)
      if(isConcertinaPressed) sendRequests("0", "motion")
      else if(isUndulatedPressed) sendRequests("1", "motion")
      else if(isInchwormPressed) sendRequests("2", "motion")
      sendRequests("1", "mode") //start
      console.log('START')
    }
    else createButtonAlert("Please select a motion before starting")
  }

  const handleButtonStopPress = () => {
    setRun(false)
    sendRequests("0", "mode")
    console.log('STOP')
  }

  const handleButtonConcertina = () => {
    if(!run){
      setIsConcertinaPressed(!isConcertinaPressed);
      setIsUndulatedPressed(false)
      setIsInchworm(false)
      console.log('CONCERTINA BUTTON ENABLED')
    }
    else console.log("Ignoring concertina button pressed...")
  }

  const handleButtonUndulated = () => {
    if(!run){
      setIsUndulatedPressed(!isUndulatedPressed);
      setIsConcertinaPressed(false)
      setIsInchworm(false)
      console.log('UNDULATED BUTTON ENABLED')
    }
    else console.log("Ignoring undulated button pressed...")
  }

  const handleButtonInchworm = () => {
    if(!run) {
      setIsInchworm(!isInchwormPressed)
      setIsConcertinaPressed(false)
      setWLSliderValue(5)
      setFreqSliderValue(5)
      setAmplSliderValue(30)
      setIsUndulatedPressed(false)
      console.log('INCHWORM BUTTON ENABLED')
    }
    else console.log("Ignoring inchworm button pressed...")
  }

  const handleWLChange = (value: number) => {
    if(isConcertinaPressed || isUndulatedPressed){
      console.log('new WL value updated')
      setWLSliderValue(value / 10);
      sendRequests(String(value), "paramsWL")
    }
    else console.log("Ignoring WaveLength value change")
  }

  const handleFreqChange = (value: number) => {
    if(isConcertinaPressed || isUndulatedPressed){
      console.log('new Freq value updated')
      setFreqSliderValue(value / 10);
      sendRequests(String(value/10), "paramsFreq")
    }
    else console.log("Ignoring Frequency value change")
  }

  const handleAmplChange = (value: number) => {
    if(isConcertinaPressed || isUndulatedPressed){
      console.log('new Ampl value updated')
      setAmplSliderValue(value);
      sendRequests(String(value), "paramsAmpl")
    }
    else console.log("Ignoring Amplitude value change")
  }

  const handleButtonReset = () => {
    sendRequests("0", "reset")
    setRun(false)
    setIsBackwards(false)
    setIsConcertinaPressed(false)
    setIsUndulatedPressed(false)
    setIsInchworm(false)
    setAmplSliderValue(0)
    setFreqSliderValue(0)
    setWLSliderValue(0)
    console.log("RESET")
  }

  const handleBackwards = () => {
    if(!run){
      console.log("BACKWARDS")
      setIsBackwards(true)
      sendRequests("0", "direction")
    }
    else console.log("Ignoring backwards button pressed...")
  }
  
  const handleForward = () => {
    if(!run){
      console.log("FORWARDS")
      setIsBackwards(false)
      sendRequests("1", "direction")
    }
    else console.log("Ignoring forwards button pressed...")
  }


  const createButtonAlert = (message: string) =>
    Alert.alert("ERROR", message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


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

        <TouchableOpacity style={[styles.button, isInchwormPressed && styles.pressedButton]} onPress={handleButtonInchworm}>
          <Text style={styles.buttonMotion}>Inchworm</Text>
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
        disabled={run || isInchwormPressed || !(isConcertinaPressed || isUndulatedPressed)}
        onValueChange={(value) => setWLSliderValue(value/10)}
        onSlidingComplete={(value) => handleWLChange(value)}
        />
        <Text>Value: {WLsliderValue}</Text>

        
      <Text style={styles.subTitle}>Set Amplitude</Text>

      <Slider
        style={{width: 200, height: 40}}
        minimumValue={30}
        maximumValue={70}
        step={1}
        disabled={run || isInchwormPressed || !(isConcertinaPressed || isUndulatedPressed)}
        value={AmplsliderValue}
        onSlidingComplete={(value) => handleAmplChange(value)}
        onValueChange={(value) => setAmplSliderValue(value)}
        />
        <Text>Value: {AmplsliderValue}</Text>

        <Text style={styles.subTitle}>Set Frequency</Text>

        <Slider
        value={FreqsliderValue}
        onValueChange={(value) => setFreqSliderValue(value/10)}
        onSlidingComplete={(value) => handleFreqChange(value)}
        minimumValue={5}
        maximumValue={40}
        step={1}
        style={{width: 200, height: 40}}
        disabled={run || isInchwormPressed || !(isConcertinaPressed || isUndulatedPressed)}
        />
        <Text>Value: {FreqsliderValue}</Text>
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
    marginBottom: 10,
    marginTop: 10,
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
