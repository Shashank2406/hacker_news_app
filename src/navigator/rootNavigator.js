import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingScreen from '../components/landingScreen';
import Login from '../screens/login';
import Splash from '../screens/splash';
import Map from '../screens/maps';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="LandingScreen"
        component={LandingScreen}
      />
      <Stack.Screen
        options={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        name="Map"
        component={Map}
      />
      <Stack.Screen
        options={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        // component={HomeStack}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = props => {
  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
