import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');

const InputOption = ({ value, setter, imageSource, activeUnit, setActiveUnit }) => {
  const renderUnitButtons = () => {
    const units = {
      'Miles': ['Miles', 'Km'],
      'kWh': ['kWh'],
      'Therms': ['Therms'],
      'kg': ['kg']
    };

    return units[activeUnit].map(unit => (
      <TouchableOpacity
        key={unit}
        style={[styles.unitButton, activeUnit === unit && styles.unitButtonActive]}
        onPress={() => setActiveUnit(unit)}
      >
        <Text style={[styles.unitText, activeUnit === unit && styles.unitTextActive]}>{unit}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.inputItem}>
      <Image source={imageSource} style={{ height: width * 0.425, width: width * 0.425 }} /> 
      
      <View style={styles.unitAndInputWrapper}>
        <View style={styles.unitWrapper}>
          {renderUnitButtons()}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter..." 
            value={value} 
            onChangeText={setter} 
          /> 
        </View>
      </View>
    </View>
  );
}

export default InputOption;

const styles = StyleSheet.create({
  inputItem: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: height * 0.15, 
    marginHorizontal: 10
  },  
  unitAndInputWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  unitWrapper: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  unitButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  unitButtonActive: {
    backgroundColor: '#4A90E2',
  },
  unitText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  unitTextActive: {
    color: '#FFFFFF',
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: width * 0.35,
    height: height * 0.045, 
  },
  input: {
    width: '100%',
    textAlign: 'center',
  },
}); 