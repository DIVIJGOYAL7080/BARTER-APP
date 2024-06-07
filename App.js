import React from 'react';
import { Stylesheet, Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import RequestExchange from './screens/RequestExchange.js';
import ExchangeRequests from './screens/ExchangeRequests';

import { AppDrawerNavigator } from './components/AppDrawerNavigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';



export default function App() {

  return(
     <AppContainer />
  );
}
var AppNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  SignUp: SignUp,
  Drawer: {
    screen: AppDrawerNavigator,
  },
});
const AppContainer = createAppContainer(AppNavigator);
