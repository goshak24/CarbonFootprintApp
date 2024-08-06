import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react' 
import HeightSpacer from '../components/reusable/HeightSpacer';
import Constants from 'expo-constants'; 

const { width, height } = Dimensions.get('window')

const Summary = ({ route }) => {
  const { carMiles, publicTransportMiles, electricity, naturalGas, generalWaste, recycledWaste } = route.params; 
  
   // Conversion factors
   const carMilesFactor = 0.411;
   const publicTransportMilesFactor = 0.089;
   const electricityFactor = 0.233;
   const naturalGasFactor = 5.3;
   const generalWasteFactor = 0.5;
   const recycledWasteFactor = 0.1;
 
   // Calculate total CO2 emissions
   const carbonEmitted = 
     (parseFloat(carMiles) * carMilesFactor) +
     (parseFloat(publicTransportMiles) * publicTransportMilesFactor) +
     (parseFloat(electricity) * electricityFactor) +
     (parseFloat(naturalGas) * naturalGasFactor) +
     (parseFloat(generalWaste) * generalWasteFactor) -
     (parseFloat(recycledWaste) * recycledWasteFactor);

  const roundedCarbonEmitted = Number(carbonEmitted.toFixed(0));

  return (
    <SafeAreaView style={styles.container}>

      <HeightSpacer height={height*0.02} /> 
      
      <View style={{flexDirection: 'row', width: width*0.9, justifyContent: 'space-between', alignSelf: 'center'}}>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
          <Text style={{fontSize: 46, fontWeight: 'bold'}}>{roundedCarbonEmitted}Kg</Text>
          <Text style={{fontSize: 24}}>CO2 Emitted</Text>

          <HeightSpacer height={height*0.01} /> 

          <View style={{backgroundColor: '#2E7D32', height: height*0.04, width: width*0.25, borderRadius: 25, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 16}}>Top 15%</Text>
          </View>
        </View>

        <Image source={require('../../assets/images/pixelearth.png')} style={{width: width*0.45, height: width*0.45}}/> 
      </View>

    </SafeAreaView>
  )
}

export default Summary

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: Constants.statusBarHeight, 
    backgroundColor: '#D4F7F7'
  }
}) 