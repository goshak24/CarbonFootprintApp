import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from "./src/screens/Onboarding";

const RootStack = createStackNavigator(); 

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Onboarding" screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Onboarding" component={Onboarding} />
      </RootStack.Navigator>
    </NavigationContainer>
  ); 
} 

export default () => {
  return (
    <App /> 
  )
} 

