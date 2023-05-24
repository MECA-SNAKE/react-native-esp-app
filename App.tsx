
//3 boutons pour changer le motion en mode showgame
//si ondulated on a tous les boutons
///si concertina, juste start and stop --> OK
//inchworm: no left and right --> OK

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@react-native-community/slider'
import { StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props { }

const App: React.FC<Props> = () => {

  const [showGame, setShowGame] = useState(false)

  const [run, setRun] = useState(false)
  const [WLsliderValue, setWLSliderValue] = useState(1)
  const [AmplsliderValue, setAmplSliderValue] = useState(40)
  const [FreqsliderValue, setFreqSliderValue] = useState(2)
  const [SpeedSliderValue, setSpeedSliderValue] = useState(1)
  const [OffsetSliderValue, setOffsetSliderValue] = useState(0)
  const [isConcertinaPressed, setIsConcertinaPressed] = useState(false)
  const [isUndulatedPressed, setIsUndulatedPressed] = useState(false)
  const [isBackwardsPressed, setIsBackwards] = useState(false)
  const [isForwardPressed, setIsForward] = useState(false)
  const [isInchwormPressed, setIsInchworm] = useState(false)
  const [isLeftPressed, setIsLeftPressed] = useState(false)
  const [isRightPressed, setIsRightPressed] = useState(false)

  function receiveRequests() {
    console.log('Im checking')
    axios
      .get('http://192.168.236.121/sensor')
      .then((response) => {
        if (response.data === 1) {
          setRun(false);
          createButtonAlert('DANGER! Hole ahead! Snake stopped...');
        } else {
          console.log('no hole found');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  /*
    useEffect(() => {
      if (run) {
        const intervalId = setInterval(receiveRequests, 1000);
        return () => {
          clearInterval(intervalId);
        };
      }
      else console.log("No need to check, snake is stopped")
    }, [run]);
  */
  function sendRequests(key: string, val: string, root: string) {

    axios.post('http://192.168.236.121/' + root, {
      [key]: val
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }

  const handleButtonStartPress = () => {
    if (((isUndulatedPressed || isInchwormPressed)
      && (isBackwardsPressed || isForwardPressed)) || isConcertinaPressed) {
      setRun(true)
      sendRequests("value", "1", "mode") //start
      console.log('START')
      //setShowGame(true)
    }
    else createButtonAlert("Please select a motion and a direction before starting!")
  }


  const handleButtonStopStartPress = () => { //TODO: HANDLE STOP ON SHOWGAME!
    if(run) {
      sendRequests("value", "0", "mode")
      setRun(false)
      console.log("STOP")}
    else {
      sendRequests("value", "1", "mode")
      setRun(true)
      console.log('START')}
  }

  const handleButtonConcertina = () => {
    if (isConcertinaPressed) return
    else {
      setIsConcertinaPressed(!isConcertinaPressed);
      setIsUndulatedPressed(false)
      setIsInchworm(false)
      console.log('CONCERTINA BUTTON ENABLED')
      sendRequests("value", "0", "motion")
    }
  }

  const handleButtonUndulated = () => {
    if (isUndulatedPressed) return
    else {
      setIsUndulatedPressed(!isUndulatedPressed);
      setIsConcertinaPressed(false)
      setIsInchworm(false)
      console.log('UNDULATED BUTTON ENABLED')
      sendRequests("value", "1", "motion")
    }
  }

  const handleButtonInchworm = () => {
    if (isInchwormPressed) return
    else {
      setIsInchworm(!isInchwormPressed)
      setIsConcertinaPressed(false)
      setWLSliderValue(1)
      setFreqSliderValue(2)
      setAmplSliderValue(40)
      setIsUndulatedPressed(false)
      console.log('INCHWORM BUTTON ENABLED')
      sendRequests("value", "2", "motion")
    }
  }

  const handleWLChange = (value: number) => {
    if (isUndulatedPressed) {
      console.log('new WL value updated')
      setWLSliderValue(value / 10);
      sendRequests("wl", String(value / 10), "params")
    }
  }

  const handleFreqChange = (value: number) => {
    if (isUndulatedPressed) {
      console.log('new Freq value updated')
      setFreqSliderValue(value / 10);
      sendRequests("freq", String(value / 10), "params")
    }
  }

  const handleAmplChange = (value: number) => {
    if (isUndulatedPressed) {
      console.log('new Ampl value updated')
      setAmplSliderValue(value);
      sendRequests("amp", String(value), "params")
    }
  }

  const handleSpeedInchwormChange = (value: number) => {
    if (isInchwormPressed) {
      console.log('new Speed value updated')
      setSpeedSliderValue(value / 10);
      sendRequests("speed", String(value / 10), "params")
    }
  }

  const handleOffsetChange = (value: number) => {
    if (isUndulatedPressed) {
      console.log('new offset value updated ' + String(value / 10))
      setOffsetSliderValue(value / 10);
      sendRequests("offset", String(value / 10), "params")
    }
  }

  const handleButtonReset = () => {
    sendRequests("value", "0", "reset")
    setRun(false)
    setIsRightPressed(false)
    setIsLeftPressed(false)
    setIsForward(false)
    setIsBackwards(false)
    setIsConcertinaPressed(false)
    setIsUndulatedPressed(false)
    setIsInchworm(false)
    setAmplSliderValue(40)
    setFreqSliderValue(2)
    setWLSliderValue(1)
    setSpeedSliderValue(1)
    setOffsetSliderValue(0)
    console.log("RESET")
    /*if (showGame) {
      setShowGame(false)
    }*/
  }

  const handleBackwards = () => {
    console.log("BACKWARDS")
    setIsBackwards(true)
    setIsForward(false)
    sendRequests("value", "0", "direction")
  }

  const handleForward = () => {
    console.log("FORWARDS")
    setIsBackwards(false)
    setIsForward(true)
    sendRequests("value", "1", "direction")
  }

  const handleLeft = () => {
    console.log("LEFT")
    sendRequests("offset_c", "0", "params")
  }

  const handleRight = () => {
    console.log("RIGHT")
    sendRequests("offset_c", "1", "params")
    setIsRightPressed(false)
    if(isLeftPressed){
      setIsLeftPressed(false)
      sendRequests("value", "1", "direction")
    }
    else {
      console.log("LEFT")
      setIsLeftPressed(true)
      setIsRightPressed(false)
      setOffsetSliderValue(OffsetSliderValue - 0.1)
      sendRequests("offset_c", "0", "params")
    }
  }


  const createButtonAlert = (message: string) => {
    Alert.alert("ERROR", message, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }

  if (showGame) {
    return (
      <View style={styles.container1}>
        <TouchableOpacity style={styles.button} onPress={handleButtonReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.roundButton, isForwardPressed && styles.pressedButton, isConcertinaPressed && styles.disabledButton]}
          onPress={handleForward}
          disabled={isConcertinaPressed}>
          <Icon name="up" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.arrowButtonContainer}>

          <TouchableOpacity style={[styles.roundButton, isLeftPressed && styles.pressedButton, (isInchwormPressed || isConcertinaPressed) && styles.disabledButton]}
            onPress={handleLeft}
            disabled = {isInchwormPressed || isConcertinaPressed}>
            <Icon name="left" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton} onPress={handleButtonStopStartPress}>
            <Text style={styles.buttonText}>{run ? 'STOP' : 'START'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.roundButton, isRightPressed && styles.pressedButton, (isInchwormPressed || isConcertinaPressed) && styles.disabledButton]}
            onPress={handleRight}
            disabled = {isInchwormPressed || isConcertinaPressed}>
            <Icon name="right" size={24} color="#FFFFFF" />
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={[styles.roundButton, isBackwardsPressed && styles.pressedButton, isConcertinaPressed && styles.disabledButton]}
          onPress={handleBackwards}
          disabled= {isConcertinaPressed}>
          <Icon name="down" size={24} color="#FFFFFF" />
        </TouchableOpacity>

      </View>

    )
  }


  return (
    <ScrollView>

      <View style={[styles.container1, { marginTop: 80, marginBottom: 80, marginLeft: 30, marginRight: 30 }]}>

      <TouchableOpacity style={styles.button} onPress={handleButtonReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <Text style={styles.titleMode}>MODE</Text>

      <View style={styles.containerButtons}>
        <TouchableOpacity style={[styles.button, run && styles.pressedButton]} onPress={handleButtonStartPress}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titleMode}>MOTION</Text>

      <View style={styles.containerButtons}>
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
      <View style={styles.containerButtons}>
        <TouchableOpacity style={[styles.button, isBackwardsPressed && styles.pressedButton, isConcertinaPressed && styles.disabledButton]}
          onPress={handleBackwards}
          disabled={isConcertinaPressed}>
          <Text style={styles.buttonMotion}>Backwards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, isForwardPressed && styles.pressedButton, isConcertinaPressed && styles.disabledButton]}
          onPress={handleForward}
          disabled={isConcertinaPressed}>
          <Text style={styles.buttonMotion}>Forward</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.titleMode}>PARAMETERS</Text>
      <Text style={styles.subTitle}>Set Offset</Text>

      <Slider
        value={OffsetSliderValue}
        onValueChange={(value) => setOffsetSliderValue(value / 10)}
        onSlidingComplete={(value) => handleOffsetChange(value)}
        minimumValue={-100}
        maximumValue={100}
        step={1}
        style={{ width: 200, height: 40 }}
        disabled={(isInchwormPressed || isConcertinaPressed) ||
          (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}

      />
      <Text>Value: {OffsetSliderValue}</Text>

      <Text style={styles.subTitle}>Set WaveLength</Text>

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={10}
        maximumValue={30}
        step={5}
        value={WLsliderValue}
        disabled={isInchwormPressed || isConcertinaPressed ||
          (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
        onValueChange={(value) => setWLSliderValue(value / 10)}
        onSlidingComplete={(value) => handleWLChange(value)}
      />
      <Text>Value: {WLsliderValue}</Text>


      <Text style={styles.subTitle}>Set Amplitude</Text>

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={20}
        maximumValue={70}
        step={1}
        disabled={isInchwormPressed || isConcertinaPressed ||
          (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
        value={AmplsliderValue}
        onSlidingComplete={(value) => handleAmplChange(value)}
        onValueChange={(value) => setAmplSliderValue(value)}
      />
      <Text>Value: {AmplsliderValue}</Text>

      <Text style={styles.subTitle}>Set Frequency</Text>

      <Slider
        value={FreqsliderValue}
        onValueChange={(value) => setFreqSliderValue(value / 10)}
        onSlidingComplete={(value) => handleFreqChange(value)}
        minimumValue={5}
        maximumValue={40}
        step={1}
        style={{ width: 200, height: 40 }}
        disabled={isInchwormPressed || isConcertinaPressed ||
          (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
      />
      <Text>Value: {FreqsliderValue}</Text>
      {/*
      <Text style={styles.subTitle}>Set Speed Inchworm</Text>

      <Slider
        value={SpeedSliderValue}
        onValueChange={(value) => setSpeedSliderValue(value / 10)}
        onSlidingComplete={(value) => handleSpeedInchwormChange(value)}
        minimumValue={2}
        maximumValue={40}
        step={1}
        style={{ width: 200, height: 40 }}
        disabled={isUndulatedPressed || isConcertinaPressed ||
          (!isConcertinaPressed && !isUndulatedPressed && !isInchwormPressed)}
      />
      <Text>Value: {SpeedSliderValue}</Text>
        */}
    </View>
    </ScrollView>
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
  titleMode: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16

  },

  subTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    marginRight: 200,

  },


  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
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
  },

  arrowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundButton: {
    backgroundColor: '#2196F3',
    width: 100,
    height: 100,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  disabledButton: {
    opacity: 0,
  },


});

export default App;