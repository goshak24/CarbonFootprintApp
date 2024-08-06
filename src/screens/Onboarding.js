import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants'; 
import { StatusBar } from 'expo-status-bar';
import HeightSpacer from '../components/reusable/HeightSpacer'; 
import InputOption from '../components/reusable/InputOption';

const { width, height } = Dimensions.get('window'); 

const Onboarding = () => {
  const [inputNum, setInputNum] = useState(0); 
  const [currentImage, setCurrentImage] = useState(require('../../assets/images/car.png')); 
  const [currentImage2, setCurrentImage2] = useState(require('../../assets/images/bus.png')); 
  const [currentOption1, setCurrentOption1] = useState(''); 
  const [currentOption2, setCurrentOption2] = useState(''); 
  const [activeUnit, setActiveUnit] = useState('Miles');
  const [activeUnit2, setActiveUnit2] = useState('Miles');
  const [carMiles, setCarMiles] = useState(''); 
  const [publicTransportMiles, setPublicTransportMiles] = useState(''); 
  const [electricity, setElectricity] = useState(''); 
  const [naturalGas, setNaturalGas] = useState(''); 
  const [generalWaste, setGeneralWaste] = useState(''); 
  const [recycledWaste, setRecycledWaste] = useState(''); 

  const handleNext = () => {
    switch (inputNum) {
      case 0: {
        setCurrentImage(require('../../assets/images/electric.png')); 
        setCurrentImage2(require('../../assets/images/flame.png')); 
        setCurrentOption1(carMiles); 
        setCurrentOption2(publicTransportMiles); 
        setActiveUnit('kWh');
        setActiveUnit2('Therms');
        break;
      }
      case 1: {
        setCurrentImage(require('../../assets/images/bin.png')); 
        setCurrentImage2(require('../../assets/images/recycled.png')); 
        setCurrentOption1(electricity); 
        setCurrentOption2(naturalGas); 
        setActiveUnit('kg');
        setActiveUnit2('kg');
        break;
      } 
      case 2: {
        setCurrentOption1(generalWaste); 
        setCurrentOption2(recycledWaste); 
        break;
      } 
      case 3: {
        // navigation to the summary page 
        break;
      }
    }
    setInputNum(inputNum + 1); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="auto" backgroundColor='#D4F7F7' /> 

      <HeightSpacer height={height * 0.01} /> 

      <View style={styles.earthStyles}>
        <Image source={require('../../assets/images/pixelearth.png')} style={{ height: width * 0.975, width: width * 0.85 }} /> 
      </View>

      <HeightSpacer height={height * 0.05} /> 

      <View style={styles.inputContainer}> 

        <Text style={styles.title}>Enter Transport Miles</Text>

        <HeightSpacer height={height * 0.015} /> 

        <View style={{marginLeft: -5}}>
          <InputOption 
            value={currentOption1} setter={setCurrentOption1} 
            imageSource={currentImage} 
            activeUnit={activeUnit} 
            setActiveUnit={setActiveUnit} 
          />
          <InputOption 
            value={currentOption2} setter={setCurrentOption2} 
            imageSource={currentImage2} 
            activeUnit={activeUnit2} 
            setActiveUnit={setActiveUnit2} 
          />
        </View>
        
        <HeightSpacer height={height * 0.0125} /> 
        <View style={{width: width*0.77, flexDirection: 'row', justifyContent: 'space-between'}}>

            <View style={{height: height*0.04, width: height*0.08, backgroundColor: '#fff', borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}> 
                <Text style={{color: '#000'}}>{inputNum + 1}/3</Text>
            </View>

            <TouchableOpacity onPress={handleNext}>
                <View style={{height: height*0.04, width: height*0.08, backgroundColor: '#4A90E2', borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Next</Text>
                </View>
            </TouchableOpacity>

        </View>

      </View>

      <HeightSpacer height={height * 0.02} /> 

    </SafeAreaView>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: Constants.statusBarHeight, 
    backgroundColor: '#D4F7F7'
  }, 
  earthStyles: {
    alignItems: 'center',  
  }, 
  inputContainer: {
    backgroundColor: '#AADDDD', 
    height: height * 0.48, 
    width: width, 
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center', 
  }, 
  title: {
    position: 'absolute',
    top: height * 0.02,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    width: '100%',
  },
}); 