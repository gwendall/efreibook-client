import React from 'react';
import HomeScreen from './screens/Home';
import UserScreen from './screens/User';
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
}, {
  initialRouteName: 'HomeStack',
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
