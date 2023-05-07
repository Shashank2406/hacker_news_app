import React from 'react';
import {Image, StyleSheet} from 'react-native';
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
        component={BottomTab}
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

const TabIcon = ({route, focused}) => {
  const get_tabIcon = tab => {
    switch (tab) {
      case 'ChargingPoints':
        return focused ? (
          <Image
            style={style.imageStyle}
            source={require('../assets/lightningBolt.png')}
          />
        ) : (
          <Image
            style={style.imageStyle}
            source={require('../assets/lightningBoltBlack.png')}
          />
        );
      case 'Cab':
        return focused ? (
          <Image
            style={style.imageStyle}
            source={require('../assets/taxi.png')}
          />
        ) : (
          <Image
            style={style.imageStyle}
            source={require('../assets/taxiBlack.png')}
          />
        );
      case 'Setting':
        return focused ? (
          <Image
            style={style.imageStyle}
            source={require('../assets/settings.png')}
          />
        ) : (
          <Image
            style={style.imageStyle}
            source={require('../assets/settingsBlack.png')}
          />
        );
      case 'share':
        return focused ? (
          <Image
            style={style.imageStyle}
            source={require('../assets/share.png')}
          />
        ) : (
          <Image
            style={style.imageStyle}
            source={require('../assets/shareBlack.png')}
          />
        );
      default:
        return <></>;
    }
  };
  return get_tabIcon(route.name);
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={'ChargingPoints'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => <TabIcon {...{route, focused}} />,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="ChargingPoints" component={Map} />
      <Tab.Screen name="Cab" component={Map} />
      <Tab.Screen name="share" component={Map} />
      <Tab.Screen name="Setting" component={Map} />
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

const style = StyleSheet.create({
  imageStyle: {
    height: 20,
    width: 20,
  },
});
