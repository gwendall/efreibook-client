import React from 'react';
import HomeScreen from './screens/Home';
import UserScreen from './screens/User';
import CameraScreen from './screens/Camera';
import ContactsScreen from './screens/Contacts';
import NotificationsScreen from './screens/Notifications';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  User: {
    screen: UserScreen,
  },
}, {
  initialRouteName: 'Home',
});

const TabNavigator = createBottomTabNavigator({
  HomeStack: HomeStack,
  Contacts: {
    screen: ContactsScreen,
  },
  Camera: {
    screen: CameraScreen,
  },
  Notifications: {
    screen: NotificationsScreen,
  },
}, {
  initialRouteName: 'Notifications',
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
