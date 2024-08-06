import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'; 

import Onboarding from "./src/screens/Onboarding";
import Summary from './src/screens/Summary'; 

const RootStack = createStackNavigator(); 

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Onboarding" screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}> 
        <RootStack.Screen name="Onboarding" component={Onboarding} />
        <RootStack.Screen name="Summary" component={Summary} /> 
      </RootStack.Navigator>
    </NavigationContainer>
  ); 
} 

export default () => {
  return (
    <App /> 
  )
} 

