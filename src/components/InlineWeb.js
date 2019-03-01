import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { APP_NAME } from "../config";
import HeaderTitle from "./HeaderTitle";

export default class MyWeb extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<HeaderTitle title={navigation.getParam('title', APP_NAME)} />
			),
			headerRight: <View />
		};
	};

	onMessage = (msg) => {
		// window.ReactNativeWebView.postMessage(string)
		console.warn(JSON.parse(msg));
		const {type, data} = JSON.parse(msg);
		switch (type) {
			case 'title':
				this.props.navigation.setParams({title: data});
				break;
			case 'login':
				this.props.navigation.navigate('Login');
				break;
			default:
				break;
		}
	}
	
	render() {
		const { navigation } = this.props;
		const uri = navigation.getParam('uri');
		
		return (
			<WebView
				onMessage={event => this.onMessage(event.nativeEvent.data)}
				onError={error => console.log(error)}
				cacheEnabled={false}
				originWhitelist={['*']}
				javaScriptEnabled={true}
				source={{uri}}
			/>
		);
	}
}