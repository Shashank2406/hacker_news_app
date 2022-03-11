import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import Comments from '../screens/comments';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from '../config/styles';


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
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          headerShown: true,
          title: 'Top Stories',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.COLOR_THEME,
          },
          headerTintColor: Colors.COLOR_WHITE,
        }}
        name="HomePage"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerShown: true,
          title: 'Comments',
          headerTitleAlign: 'center',
        }}
        name="Comments"
        component={Comments}
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
