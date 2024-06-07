import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyExchangeScreen from '../screens/MyExchangeScreen';
import NotificationScreen from '../screens/Notification';
import SettingScreen from '../screens/SettingScreen';
import MyExchangedItemsScreen from '../screens/MyExchangedItemsScreen'

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
  MyExchanges : {
    screen : MyExchangeScreen
  },
  Notification : {
    screen : NotificationScreen
  },
  MyExchangedItems :{
    screen: MyExchangedItemsScreen
  },
  Setting : {
    screen : SettingScreen
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
