import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import RequestExchange from '../screens/RequestExchange';
import ExchangeRequests from '../screens/ExchangeRequests';
import ReciverScreen from '../screens/RecieverScreen'


export  const AppStackNavigator = createStackNavigator(
  {
  ExchangeList : {screen : ExchangeRequests,
  navigationOptions: {headerShown: false}
  },

  ReciverDetails : {screen : ReciverScreen,
  navigationOptions: {headerShown: false}
  },
  
  },
  {
    initialRouteName: 'ExchangeList'
  }
  
)