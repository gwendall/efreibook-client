import React from 'react';
import HomeScreen from './screens/Home';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
}, {
  initialRouteName: 'Home',
});

const TabNavigator = createBottomTabNavigator({
  HomeStack: HomeStack,
}, {
  initialRouteName: 'HomeStack',
  tabBarOptions: {
    activeTintColor: 'green',
    inactiveTintColor: 'gray',
  }
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
