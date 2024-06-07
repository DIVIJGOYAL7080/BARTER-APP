import React from 'react';
import { Stylesheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignUp from '../screens/SignUp';
import { Image } from 'react-native';
import RequestExchange from '../screens/RequestExchange.js';
import ExchangeRequests from '../screens/ExchangeRequests';
import { AppStackNavigator } from './AppStackNavigator';
export const AppTabNavigator = createBottomTabNavigator({
  ExchangeRequests: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          style={{ width: 20, height: 20 }}
          source={require('../assets/snack-icon.png')}
        />
      ),
      tabBarLabel: 'ExchangeRequests',
    },
  },
  RequestExchange: {
    screen: RequestExchange,
    navigationOptions: {
      tabBarIcon: (
        <Image
          style={{ width: 20, height: 20 }}
          source={require('../assets/snack-icon.png')}
        />
      ),
      tabBarLabel: 'RequestExchange',
    },
  },
});
