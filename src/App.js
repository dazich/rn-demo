import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from './pages/Home';
import User from './pages/User';
import IconHome from './img/home.png';
import IconUser from './img/user.png';

const tabIconList = {
  'Home': IconHome,
  'User': IconUser
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    User: User,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        // You can return any component that you like here!
        return <Image source={tabIconList[routeName]} style={{width: 30, height: 30}}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ff8300',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);