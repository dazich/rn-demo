import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './pages/Home';
import User from './pages/User';
import Verify from './pages/Verify';
import InlineWeb from './components/InlineWeb';

import IconHome from './img/home.png';
import IconUser from './img/user.png';

const tabIconList = {
	'Home': IconHome,
	'Verify': IconHome,
	'User': IconUser
}

const HomeStack = createStackNavigator({
	Home: { screen: Home },
	Web: { screen: InlineWeb },
});

const VerifyStack = createStackNavigator({
	Verify: { screen: Verify },
	Web: { screen: InlineWeb },
});

const UserStack = createStackNavigator({
	User: { screen: User },
	Web: { screen: InlineWeb },
});

const TabNavigator = createBottomTabNavigator(
	{
		Home: { screen: HomeStack },
		Verify: { screen: VerifyStack },
		User: { screen: UserStack },
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
		initialRouteName: "Home"
	}
);

export default createAppContainer(TabNavigator);