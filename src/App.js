import React from 'react';
import { Image, Text } from 'react-native';
import { Provider } from '@ant-design/react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { THEME } from './config';
import Home from './pages/Home';
import Verify from './pages/Verify';
import User from './pages/User';
import Login from './pages/Login';
import Web from './components/InlineWeb';

import IconHome from './img/home.png';
import IconHomeSelected from './img/home_1.png';
import IconUser from './img/user.png';
import IconUserSelected from './img/user_1.png';
import IconVerify from './img/verify.png';
import IconVerifySelected from './img/verify_1.png';

const tabIconList = {
	Home: {
		0: IconHome,
		1: IconHomeSelected,
	},
	User: {
		0: IconUser,
		1: IconUserSelected,
	},
	Verify: {
		0: IconVerify,
		1: IconVerifySelected,
	},
};

const tabName = {
	Home: '首页',
	User: '我的',
	Verify: '认证',
};

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
);

HomeStack.navigationOptions =
VerifyStack.navigationOptions =
UserStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible,
	};
};

const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeStack,
		Verify: VerifyStack,
		User: UserStack,
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				const status = focused ? 1 : 0;
				// console.warn(`${routeName}::${status}`)
				// You can return any component that you like here!
				return <Image source={tabIconList[routeName][status]} style={{width: 40, height: 40}}/>;
			},
			tabBarLabel: () => {
				const { routeName } = navigation.state;
				return <Text style={{textAlign: 'center'}}>{tabName[routeName]}</Text>;
			}
		}),
		tabBarOptions: {
			activeTintColor: THEME.COLOR,
			inactiveTintColor: 'gray',
			style: {
				height: 66,
			}
		},
		initialRouteName: "Home"
	}
);

const appNavigator = createSwitchNavigator(
	{
		Home: TabNavigator,
		Login,
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
