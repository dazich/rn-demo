import React from 'react';
import { Image } from 'react-native';
import { Provider } from '@ant-design/react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { THEME } from './config';
import Home from './pages/Home';
import Verify from './pages/Verify';
import User from './pages/User';
import Login from './pages/Login';
import Web from './components/InlineWeb';

import IconHome from './img/home.png';
import IconUser from './img/user.png';

const tabIconList = {
	'Home': IconHome,
	'User': IconUser
}

const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: THEME.COLOR,
	},
	headerTintColor: '#fff',
	headerTitleStyle: {
		fontWeight: 'bold',
	},
};

const HomeStack = createStackNavigator(
	{Home,Web},
	{
		initialRouteName: 'Home',
		/* The header config is here */
		defaultNavigationOptions
	}
)

const VerifyStack = createStackNavigator(
	{Verify,Web},
	{
		initialRouteName: 'Verify',
		/* The header config is here */
		defaultNavigationOptions
	}
)

const UserStack = createStackNavigator(
	{User,Web},
	{
		initialRouteName: 'User',
		/* The header config is here */
		defaultNavigationOptions
	}
)

const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeStack,
		User: UserStack,
		Verify: VerifyStack,
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
			activeTintColor: THEME.COLOR,
			inactiveTintColor: 'gray',
		},
		initialRouteName: "Home"
	}
);

const appNavigator = createSwitchNavigator(
	{
		Login,
		Home: TabNavigator,
	},
	{
		initialRouteName: 'Home',
	}
);

const AppContainer = createAppContainer(appNavigator);

export default class App extends React.Component {
	render() {
		return (
			<Provider>
				<AppContainer />
			</Provider>
		)
	}
}
