
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
	Toast,
	Button
} from '@ant-design/react-native';

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
			title: params ? params.otherParam : 'Home',
		};
	};

	_gotoWeb = () => {
		this.props.navigation.navigate('Web', {uri: 'http://192.168.1.7:3000/user'});
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to React Native!</Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
				<Button
					type="warning"
					title="Go to User"
					onPress={this._gotoWeb}
				>Test</Button>
			</View>
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
