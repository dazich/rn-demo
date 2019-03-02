
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import {
	Toast,
	Button
} from '@ant-design/react-native';
import HeaderTitle from "../components/HeaderTitle";
import {APP_NAME} from "../config";

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

export default class Home extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		return {
			headerTitle: (
				<HeaderTitle title={params ? params.otherParam : APP_NAME} />
			),
			// headerRight: <View/>
		};
	};

	_gotoWeb = () => {
		this.props.navigation.navigate('Web', {uri: 'http://120.78.170.195:5000/order'});
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.welcome}>Welcome to React Native!</Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
				<Button
					type="warning"
					title="Go to User"
					onPress={this._gotoWeb}
				>Test</Button>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
