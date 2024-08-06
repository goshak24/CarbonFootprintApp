import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants'; 
import { StatusBar } from 'expo-status-bar';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import HeightSpacer from '../components/reusable/HeightSpacer'; 
import InputOption from '../components/reusable/InputOption';

const { width, height } = Dimensions.get('window'); 

const Onboarding = ({ navigation }) => {
  const [inputNum, setInputNum] = useState(0); 
  const [currentImage, setCurrentImage] = useState(require('../../assets/images/car.png')); 
  const [currentImage2, setCurrentImage2] = useState(require('../../assets/images/bus.png')); 
  const [activeUnit, setActiveUnit] = useState('Miles');
  const [activeUnit2, setActiveUnit2] = useState('Miles');
  const [carMiles, setCarMiles] = useState(''); 
  const [publicTransportMiles, setPublicTransportMiles] = useState(''); 
  const [electricity, setElectricity] = useState(''); 
  const [naturalGas, setNaturalGas] = useState(''); 
  const [generalWaste, setGeneralWaste] = useState(''); 
  const [recycledWaste, setRecycledWaste] = useState(''); 

  const earthScale = useSharedValue(0);
  const containerTranslateY = useSharedValue(height);

  useEffect(() => {
    earthScale.value = withSpring(1, { damping: 10, stiffness: 100 }, () => {
      containerTranslateY.value = withTiming(0, { duration: 500 });
    });
  }, []);

  const earthAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: earthScale.value }],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: containerTranslateY.value }],
    };
  });

  const handleNext = () => {
    switch (inputNum) {
      case 0: {
        setCurrentImage(require('../../assets/images/electric.png')); 
        setCurrentImage2(require('../../assets/images/flame.png')); 
        setActiveUnit('kWh');
        setActiveUnit2('Therms');
        setInputNum(inputNum + 1); 
        break;
      }
      case 1: {
        setCurrentImage(require('../../assets/images/bin.png')); 
        setCurrentImage2(require('../../assets/images/recycled.png')); 
        setActiveUnit('kg');
        setActiveUnit2('kg');
        setInputNum(inputNum + 1); 
        break;
      } 
      default: {
        navigation.navigate('Summary', { 
          carMiles, 
          publicTransportMiles, 
          electricity, 
          naturalGas, 
          generalWaste, 
          recycledWaste 
        }); 
        break;
      } 
    }
  };

  const getCurrentSetters = () => {
    switch (inputNum) {
      case 0:
        return { setter1: setCarMiles, setter2: setPublicTransportMiles };
      case 1:
        return { setter1: setElectricity, setter2: setNaturalGas };
      case 2:
        return { setter1: setGeneralWaste, setter2: setRecycledWaste };
      default:
        return { setter1: () => {}, setter2: () => {} };
    }
  };

  const { setter1, setter2 } = getCurrentSetters();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="auto" backgroundColor='#D4F7F7' /> 

      <HeightSpacer height={height * 0.02} /> 

      <Animated.View style={[styles.earthStyles, earthAnimatedStyle]}>
        <Image source={require('../../assets/images/pixelearth.png')} style={{ height: width * 0.975, width: width * 0.85 }} /> 
      </Animated.View>

      <HeightSpacer height={height * 0.02} /> 

      <Animated.View style={[styles.inputContainer, containerAnimatedStyle]}> 

        <Text style={styles.title}>Enter Daily Emissions</Text>

        <HeightSpacer height={height * 0.0175} /> 

        <View style={{marginLeft: -5}}>
          <InputOption 
            value={inputNum === 0 ? carMiles : inputNum === 1 ? electricity : generalWaste} 
            setter={setter1} 
            imageSource={currentImage} 
            activeUnit={activeUnit} 
            setActiveUnit={setActiveUnit} 
          />
          <InputOption 
            value={inputNum === 0 ? publicTransportMiles : inputNum === 1 ? naturalGas : recycledWaste} 
            setter={setter2} 
            imageSource={currentImage2} 
            activeUnit={activeUnit2} 
            setActiveUnit={setActiveUnit2} 
          />
        </View>
        
        <HeightSpacer height={height * 0.01} /> 
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

      </Animated.View>

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
    marginTop: height * 0.02, 
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