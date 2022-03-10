import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function InitialStack() {
  return (
    <Stack.Navigator
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          headerShown: true,
        }}
        name="HomePage"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

function MainNavigator(props) {
  return (
    <NavigationContainer>
      <InitialStack />
    </NavigationContainer>
  );
}

export default MainNavigator;
